const express = require('express');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const restrict = require('../middlewares/auth.mdw');
const config = require('../config/default.json');


const router = express.Router();

router.get('/dangnhap', async function (req, res){
    res.render('viewsAccount/dangnhap',{
        layout: false
    });
})

router.post('/dangxuat', restrict, function (req, res) {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  res.redirect(req.headers.referer);
})

router.post('/dangnhap', async function (req, res) {
    const user = await userModel.singleByUserName(req.body.taikhoan);
    if (user === null) {
      return res.render('viewsAccount/dangnhap', {
        layout: false,
        err: 'Sai tài khoản hoặc mật khẩu.'
      })
    }
  
    const rs = bcrypt.compareSync(req.body.matkhau, user.matkhau);
    if (rs === false) {
      return res.render('viewsAccount/dangnhap', {
        layout: false,
        err: 'Sai tài khoản hoặc mật khẩu.'
      })
    }
  
    delete user.matkhau;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
  
    const url = req.query.retUrl || '/';
    res.redirect(url);
  })

router.get('/dangky', async function (req, res){
    res.render('viewsAccount/dangky');
})

router.post('/dangky', async function (req, res){
    const ngaysinh = moment(req.body.ngaysinh, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const matkhau = bcrypt.hashSync(req.body.matkhau, config.authentication.saltRounds);
    const entity = {
        taikhoan: req.body.taikhoan,
        matkhau,
        ten: req.body.ten,
        email: req.body.email,
        ngaysinh,
        loaitk: 1
    }
    await userModel.add(entity);
    res.render('viewsAccount/dangky');
})

router.get('/thongtin', restrict, async function (req, res){
    res.render('viewsAccount/thongtin');
})

router.get('/thongtin/doimatkhau', restrict, async function (req, res){
  res.render('viewsAccount/doimatkhau');
})

router.post('/thongtin/doima', restrict, async function (req, res){
  res.redirect('/taikhoan/thongtin/doimatkhau');
})

router.get('/thongtin/chinhsua', restrict, async function (req, res){
    const rows = await userModel.single(req.session.authUser.idtk);
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const thongtin = rows[0];
    res.render('viewsAccount/chinhsua', {thongtin});
})

router.post('/thongtin/chinhsua', restrict, async function (req, res){
  
  res.redirect('/taikhoan/thongtin/chinhsua');
})

router.post('/thongtin/chinhsua/update', restrict, async function (req, res){
  await userModel.patch(req.body);
  res.redirect('/taikhoan/thongtin');
  
})


router.post('/thongtin/doimatkhau', async function (req, res) {
  const user = await userModel.singleByUserName(req.session.authUser.taikhoan);
  const rs = bcrypt.compareSync(req.body.matkhaucu, user.matkhau);
  if (rs === false) {
    return res.render('viewsAccount/doimatkhau', {
      err: 'Mật khẩu cũ không đúng.'
    })
  }
  if (req.body.matkhau !== req.body.matkhaulai || req.body.matkhau === null) {
    return res.render('viewsAccount/doimatkhau', {
      err: 'Nhập lại mật khẩu không đúng !!'
    })
  }
  const matkhau = bcrypt.hashSync(req.body.matkhau, config.authentication.saltRounds);
  const entity = {
    idtk: req.body.idtk,
    matkhau: matkhau
}
  
  await userModel.patch(entity);
  res.redirect('/taikhoan/thongbao');
})

router.get('/thongbao', restrict, async function (req, res){
  res.render('viewsAccount/thongbao');
})

router.get('/kiemtra/user', async function (req, res){
  const user = await userModel.singleByUserName(req.query.user);
  if (!user) {
    return res.json(true);
  }
  res.json(false);
})

router.get('/kiemtra/gmail', async function (req, res){
  const email = await userModel.singleByGmailName(req.query.email);
  if (!email) {
    return res.json(true);
  }
  res.json(false);
})



module.exports = router;
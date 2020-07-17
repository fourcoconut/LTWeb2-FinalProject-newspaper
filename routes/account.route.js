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

router.post('/logout', restrict, function (req, res) {
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

module.exports = router;
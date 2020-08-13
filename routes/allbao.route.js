const express = require('express');
const baoModel = require('../models/allbao.model');
const restrict = require('../middlewares/auth.mdw');
const config = require('../config/default.json');
const multer = require('multer');
const PQNB = require('../middlewares/PQNB.mdw');

const router = express.Router();

router.get('/chitiet/:idbao', async function (req, res) {
    const rows = await baoModel.single(req.params.idbao);
    res.render('viewsBao/chitiet', {
      ctbao: rows[0]
    });
});

router.get('/vietbao', PQNB, function (req, res) {
    res.render('viewsBao/vietbao');
});

router.get('/taianh', PQNB, function (req, res) {
  res.render('viewsBao/taianh');
});

router.post('/taianh', function (req, res) {

  const storage = multer.diskStorage({
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
    destination(req, file, cb) {
      cb(null, './public/imgs');
    }
  })

  const upload = multer({ storage });
  upload.array('fuMain', 3)(req, res, function (err) {
    if (!err)
      res.render('viewsBao/taianh');
    else res.send('err');
  })
})

router.get('/chuyenmuc/:id', async function (req, res){
    const page = +req.query.page || 1;
    if(page < 0) 
      page = 1;
    const offset = (page - 1) * config.pagination.limit;
    const [list, slbao] = await Promise.all([
      baoModel.pageBao(req.params.id, config.pagination.limit, offset),
      baoModel.countBao(req.params.id)
    ])
    const sotrang = Math.ceil(slbao / config.pagination.limit);
    const trang = [];
    for(let i = 1; i <= sotrang; i++){
      if(i > page - 3 && i < page + 3)
      {
        const tam = {
          value: i,
          tranghientai: i === page
        }
        trang.push(tam);
      }
    }
    res.render('viewsBao/bao', {
        bao: list,
        empty: list.length === 0,
        trang,
        trangtruoc: page - 1,
        trangsau: page + 1,
        trangdau: page > 1,
        trangcuoi: page < sotrang
    });
})

router.post('/chuyenmuc/chitiet', async function (req, res){
  const rows = await baoModel.single(req.body.idbao);
  let baoObject = rows.length ? rows[0] : {};
  if (baoObject) {
    await baoModel.patch({
      idbao: baoObject.idbao,
      slxem: baoObject.slxem + 1
    });
  }
  res.redirect(`/bao/chitiet/${req.body.idbao}`);
})

router.post('/chitiet', async function (req, res){
  const rows = await baoModel.single(req.body.idbao);
  let baoObject = rows.length ? rows[0] : {};
  if (baoObject) {
    await baoModel.patch({
      idbao: baoObject.idbao,
      slxem: baoObject.slxem + 1
    });
  }
  res.redirect(`/bao/chitiet/${req.body.idbao}`);
})
  
  router.post('/vietbao', async function (req, res) {
    const entity = {
        tieudecd: req.body.tieudecd,
        noidungchinhcd: req.body.noidungchinhcd,
        noidungcd: req.body.noidungcd,
        nguoiviet: req.body.nguoiviet
    }
  await baoModel.addcd(entity);
  res.redirect("/bao/vietbao");
  })

router.post('/timkiem', async function (req, res){
  const list = await baoModel.timBao(req.body.timkiem);
  res.render('viewsBao/timkiem', {
      bao: list,
      empty: list.length === 0
  });
})

module.exports = router;
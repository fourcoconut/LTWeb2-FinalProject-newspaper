const express = require('express');
const TheLoaiModel = require('../models/theloai.model');
const PQQTV = require('../middlewares/PQQTV.mdw');

const router = express.Router();

router.get('/', PQQTV, async function (req, res){

    const list = await TheLoaiModel.all();
    
    res.render('viewsTheLoai/list', {
        layout: false,
        theloai: list,
        empty: list.length === 0
    });
})

router.get('/add', PQQTV, function(req, res){
    res.render('viewsTheLoai/add', {
        layout: false
    });
})

router.post('/add', async function(req, res){
    const entity = {
        tentheloai: req.body.tentheloai 
    }
  await TheLoaiModel.add(entity);
  res.redirect("/admin/TheLoai");
})

router.get('/edit/:id', PQQTV, async function(req, res){
    const id = +req.params.id || -1;
    const rows = await TheLoaiModel.single(id);
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const theloai = rows[0];
    res.render('viewsTheLoai/edit', {
        layout: false,
        theloai
    });
})

router.post('/del', async function(req, res){
    await TheLoaiModel.del(req.body.idtheloaibao);
    res.redirect("/admin/TheLoai");
})

router.post('/update', async function(req, res){
    await TheLoaiModel.patch(req.body);
    res.redirect("/admin/TheLoai");
})


module.exports = router;
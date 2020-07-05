const express = require('express');
const TheLoaiModel = require('../models/theloai.model');

const router = express.Router();

router.get('/', async function (req, res){

    const list = await TheLoaiModel.all();
    
    res.render('viewsTheLoai/list', {
        theloai: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsTheLoai/add');
})

router.post('/add', async function(req, res){
    const entity = {
        tentheloai: req.body.tentheloai 
    }
  await TheLoaiModel.add(entity);
  res.redirect("/admin/TheLoai");
})

router.get('/edit', async function(req, res){
    const id = +req.query.id || -1;
    const rows = await TheLoaiModel.single(id);
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const theloai = rows[0];
    res.render('viewsTheLoai/edit', {theloai});
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
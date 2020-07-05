const express = require('express');
const CMucModel = require('../models/chuyenmuc.model');
const TheLoaiModel = require('../models/theloai.model');

const router = express.Router();

router.get('/', async function (req, res){
    
    const list = await CMucModel.all();
    const listtl = await TheLoaiModel.single();
    const idtl = await CMucModel.LayIDTL();
    res.render('viewsCMuc/list', {
        CMuc: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsCMuc/add');
})

router.post('/add', function(req, res){
    res.render('viewsTheLoai/add');
})

module.exports = router;
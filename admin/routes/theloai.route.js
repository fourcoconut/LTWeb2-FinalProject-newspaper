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

module.exports = router;
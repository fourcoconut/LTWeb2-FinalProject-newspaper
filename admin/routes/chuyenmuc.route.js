const express = require('express');
const CMucModel = require('../models/chuyenmuc.model');

const router = express.Router();

router.get('/', async function (req, res){
    
    const list = await CMucModel.all();
    
    res.render('viewsCMuc/list', {
        CMuc: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsCMuc/add');
})

module.exports = router;
const express = require('express');
const baoModel = require('../models/bao.model');

const router = express.Router();

router.get('/', async function (req, res){

    const list = await baoModel.all();
    
    res.render('viewsBao/list', {
        bao: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsBao/add');
})

module.exports = router;
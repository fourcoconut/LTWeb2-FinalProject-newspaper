const express = require('express');
const baoCDModel = require('../models/baocd.model');

const router = express.Router();

router.get('/', async function (req, res){

    const list = await baoCDModel.all();
    
    res.render('viewsBaoCD/list', {
        baoCD: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsBaoCD/add');
})

module.exports = router;
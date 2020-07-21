const express = require('express');
const baoModel = require('../models/allbao.model');

const router = express.Router();

router.get('/:id', async function (req, res){
    const list = await baoModel.allBao(req.params.id);
    res.render('viewsBao/bao', {
        bao: list,
        empty: list.length === 0
    });
})

router.get('/add', function(req, res){
    res.render('viewsBao/add');
})

module.exports = router;
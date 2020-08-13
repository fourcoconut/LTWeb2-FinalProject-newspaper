const express = require('express');
const baoModel = require('../models/baoad.model');
const PQQTV = require('../middlewares/PQQTV.mdw');

const router = express.Router();

router.get('/', PQQTV, async function (req, res){

    const list = await baoModel.all();
    
    res.render('viewsBaoad/list', {
        layout: false,
        bao: list,
        empty: list.length === 0
    });
})

router.post('/', async function(req, res){
    await baoModel.del(req.body.idbao);
    res.redirect("/admin/bao");
})

module.exports = router;
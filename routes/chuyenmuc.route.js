const express = require('express');
const CMucModel = require('../models/chuyenmuc.model');
const PQQTV = require('../middlewares/PQQTV.mdw');

const router = express.Router();

router.get('/', PQQTV, async function (req, res){
    
    const list = await CMucModel.all();
    res.render('viewsCMuc/list', {
        layout: false,
        CMuc: list,
        empty: list.length === 0
    });
})

router.get('/add', PQQTV, async function(req, res){
    const listtl = await CMucModel.alltl();
    res.render('viewsCMuc/add', {
        layout: false,
        TheLoai: listtl
    });
})

router.get('/edit/:id', PQQTV, async function(req, res){
    const id = +req.params.id || -1;
    const rows = await CMucModel.single(id);
    const listtl = await CMucModel.alltl();
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const chuyenmuc = rows[0];
    res.render('viewsCMuc/edit', {
        layout: false,
        chuyenmuc,
        TheLoai: listtl
    });
})

router.post('/add', async function(req, res){
    const entity = {
        idtheloai: req.body.idtheloaibao,
        tenchuyenmuc: req.body.tenchuyenmuc
    }
  await CMucModel.add(entity);
  res.redirect("/admin/CMuc");
})

router.post('/del', async function(req, res){
    await CMucModel.del(req.body.idchuyenmuc);
    res.redirect("/admin/CMuc");
})

router.post('/update', async function(req, res){
    await CMucModel.patch(req.body);
    res.redirect("/admin/CMuc");
})

module.exports = router;
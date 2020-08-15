const express = require('express');
const taikhoanModel = require('../models/taikhoan.model');
const PQQTV = require('../middlewares/PQQTV.mdw');

const router = express.Router();

router.get('/', PQQTV, async function (req, res){

    const list = await taikhoanModel.all();
    
    res.render('viewsTaiKhoan/list', {
        layout: false,
        taikhoan: list,
        empty: list.length === 0
    });
})

router.get('/edit/:id', PQQTV, async function(req, res){
    const id = +req.params.id || -1;
    const rows = await taikhoanModel.single(id);
    const listltk = await taikhoanModel.allltk();
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const taikhoan = rows[0];
    res.render('viewsTaiKhoan/edit', {
        layout: false,
        taikhoan,
        LoaiTK: listltk
    });
})

router.post('/del', async function(req, res){
    await taikhoanModel.del(req.body.idtk);
    res.redirect("/admin/TaiKhoan");
})

router.post('/update', async function(req, res){
    await taikhoanModel.patch(req.body);
    res.redirect("/admin/TaiKhoan");
})

module.exports = router;
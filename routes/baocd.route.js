const express = require('express');
const baoCDModel = require('../models/baocd.model');
const PQQTV = require('../middlewares/PQQTV.mdw');

const router = express.Router();

router.get('/', PQQTV, async function (req, res){

    const list = await baoCDModel.all();
    
    res.render('viewsBaoCD/list', {
        layout: false,
        baoCD: list,
        empty: list.length === 0
    });
})

router.get('/edit/:id', PQQTV, async function(req, res){
    const id = +req.params.id || -1;
    const rows = await baoCDModel.single(id);
    const listtl = await baoCDModel.alltl();
    const listcm = await baoCDModel.allcm();
    if (rows.length === 0)
        return res.send('Invalid parameter.');

    const baochoduyet = rows[0];
    res.render('viewsBaoCD/edit', {
        layout: false,
        baochoduyet,
        TheLoai: listtl,
        ChuyenMuc: listcm
    });
})

router.post('/del', async function(req, res){
    await baoCDModel.del(req.body.idbao);
    res.redirect("/admin/baoCD");
})

router.post('/update', async function(req, res){
    const ngayhientai = new Date();
    const ngaydang = ngayhientai.getFullYear()+'-'+(ngayhientai.getMonth()+1)+'-'+ngayhientai.getDate();
    const entity = {
        tieude: req.body.tieude,
        noidung: req.body.noidung,
        noidungchinh: req.body.noidungchinh,
        ngaydang,
        slxem: 0,
        slbinhluan: 0,
        loaibao: req.body.loaibao,
        idchuyenmuc: req.body.idchuyenmuc,
        tacgia: req.body.tacgia
    }
  await baoCDModel.add(entity);
  await baoCDModel.del(req.body.idbao);
  res.redirect("/admin/baoCD");
})

module.exports = router;
const express = require('express');
const { stack } = require('./routes/baoad.route');
require('express-async-errors');
const trangchuModel = require('./models/trangchu.model');
const PQQTV = require('./middlewares/PQQTV.mdw');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use('/public', express.static('public'));

require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.get('/admin', PQQTV, function (req, res){
    res.render('homead', {
        layout: false
    });
})

app.get('/', async function (req, res){
    const listmoi = await trangchuModel.MoiNhat();
    const listxem = await trangchuModel.XemNhieuNhat();
    const listhot = await trangchuModel.HotNhat();
    res.render('home', {
        moinhat: listmoi,
        xem: listxem,
        hot: listhot
    });
})

app.use('/admin/bao', require('./routes/baoad.route'));
app.use('/admin/CMuc', require('./routes/chuyenmuc.route'));
app.use('/admin/baoCD', require('./routes/baocd.route'));
app.use('/admin/TheLoai', require('./routes/theloai.route'));
app.use('/admin/TaiKhoan', require('./routes/taikhoan.route'));

app.use('/bao', require('./routes/allbao.route'));
app.use('/taikhoan', require('./routes/account.route'));

app.use(function (req, res) {
    res.render('404', { layout: false });
  })

app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).render('500', { layout: false});
})

const PORT = 3000;

app.listen(PORT, function (){
    console.log(`Sever is running at http://localhost:${PORT}`);
})
const express = require('express');
const { stack } = require('./admin/routes/bao.route');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({
    extended: true
}));



app.use((req, res, next) => {
    app.set('views', __dirname + '\\views');
    if (req.path.includes('/admin')) {
        app.set('views', __dirname + '\\admin\\views');
    }
    next()
})

app.use('/public', express.static('public'));

require('./middlewares/view.mdw')(app);
require('./middlewares/session.mdw')(app);
require('./middlewares/locals.mdw')(app);

app.get('/admin', function (req, res){
    res.render('home');
})

app.get('/', function (req, res){
    res.render('home');
})

app.use('/admin/bao', require('./admin/routes/bao.route'));
app.use('/admin/CMuc', require('./admin/routes/chuyenmuc.route'));
app.use('/admin/baoCD', require('./admin/routes/baocd.route'));
app.use('/admin/TheLoai', require('./admin/routes/theloai.route'));

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
    console.log(`Sever is running at http://localhost: ${PORT}`);
})
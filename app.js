const express = require('express');
const exphbs = require('express-handlebars');
const { stack } = require('./admin/routes/bao.route');
const numeral = require('numeral');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.engine('hbs', exphbs({
    helpers: {
        format_number: function(value) {
            return numeral(value).format('0,0');
        }
    }
}));
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    app.set('views', __dirname + '\\views');
    if (req.path.includes('/admin')) {
        app.set('views', __dirname + '\\admin\\views');
    }
    next()
})

app.use('/public', express.static('public'));

const TLoaiModel = require('./admin/models/theloai.model');
app.use(async function (req, res, next) {
    const rows = await TLoaiModel.allTLANDCM();
    res.locals.lcTLoai = rows;
    next();
})

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
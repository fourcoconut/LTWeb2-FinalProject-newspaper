const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
app.use((req, res, next) => {
    app.set('views', __dirname + '\\views');
    if (req.path.includes('/admin')) {
        app.set('views', __dirname + '\\admin\\views');
    }
    next()
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

const PORT = 3000;

app.listen(PORT, function (){
    console.log(`Sever is running at http://localhost: ${PORT}`);
})
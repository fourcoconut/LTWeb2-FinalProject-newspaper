module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect(`/taikhoan/dangnhap?retUrl=${req.originalUrl}`);
    }
  
    next();
  }
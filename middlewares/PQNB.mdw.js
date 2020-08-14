module.exports = function (req, res, next) {
    if (!req.session.isAuthenticated) {
      return res.redirect(`/taikhoan/dangnhap?retUrl=${req.originalUrl}`);
    } else {
        if(req.session.authUser.loaitk != 4 && req.session.authUser.loaitk != 3){
            return res.status(404).json('Tài khoản của bạn không được phép truy cập vào trang này!!!!');
        }
    }
    next();
  }
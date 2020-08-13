const TLoaiModel = require('../models/theloai.model');

module.exports = function (app) {
    app.use(function (req, res, next) {
      if (req.session.isAuthenticated === null) {
        req.session.isAuthenticated = false;
      }
  
      res.locals.lcIsAuthenticated = req.session.isAuthenticated;
      res.locals.lcAuthUser = req.session.authUser;
      next();
    })
  
    app.use(async function (req, res, next) {
        const rows = await TLoaiModel.allTLANDCM();
        res.locals.lcTLoai = rows;
        next();
    })
  }
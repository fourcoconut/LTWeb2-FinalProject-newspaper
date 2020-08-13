const db = require('../utils/db');

const TBL_TK = 'taikhoan';

module.exports = {
    all: function () {
        return db.load(`select tk.idtk, tk.taikhoan, tk.ten, tk.email, ltk.loaitk from ${TBL_TK} tk, loaitaikhoan ltk where tk.loaitk = ltk.idloaitk`);
    },
    allltk: function () {
      return db.load(`select * from loaitaikhoan`);
  },
    single: function (id) {
        return db.load(`select * from ${TBL_TK} where idtk = ${id}`);
      },
      patch: function (entity) {
        const condition = {
          idtk: entity.idtk
        }
        delete entity.idtk;
        return db.patch(TBL_TK, entity, condition);
      },
      del: function (id) {
        const condition = {
          idtk: id
        }
        return db.del(TBL_TK, condition);
      }
}
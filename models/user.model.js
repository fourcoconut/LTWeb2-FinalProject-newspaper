const db = require('../utils/db');

const TBL_USER = 'taikhoan';

module.exports = {
    add: function (entity) {
        return db.add(TBL_USER, entity);
    },
    patch: function (entity) {
      const condition = {
        idtk: entity.idtk
      }
      delete entity.idtk;
      return db.patch(TBL_USER, entity, condition);
    },
    singleByUserName: async function (taikhoan) {
      const rows = await db.load(`select * from ${TBL_USER} where taikhoan = '${taikhoan}'`);
      if (rows.length === 0)
        return null;
  
      return rows[0];
    }
}
const db = require('../utils/db');

const TBL_USER = 'taikhoan';

module.exports = {
    add: function (entity) {
        return db.add(TBL_USER, entity);
    },
    singleByUserName: async function (taikhoan) {
      const rows = await db.load(`select * from ${TBL_USER} where taikhoan = '${taikhoan}'`);
      if (rows.length === 0)
        return null;
  
      return rows[0];
    }
}
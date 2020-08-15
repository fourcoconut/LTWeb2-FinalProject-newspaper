const db = require('../utils/db');

const TBL_BAO = 'bao';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_BAO}`);
    },
    single: function (id) {
        return db.load(`select * from ${TBL_BAO} where idbao = ${id}`);
      },
      add: function (entity) {
        return db.add(TBL_BAO, entity);
      },
      del: function (id) {
        const condition = {
          idbao: id
        }
        return db.del(TBL_BAO, condition);
      }
}
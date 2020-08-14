const db = require('../utils/db');

const TBL_BAOCD = 'baochoduyet';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_BAOCD}`);
    },
    single: function (id) {
        return db.load(`select * from ${TBL_BAOCD} where idbaocd = ${id}`);
    },
    alltl: function () {
      return db.load(`select * from theloaibao`);
    },
    allcm: function () {
      return db.load(`select * from chuyenmuc`);
    },
    add: function (entity) {
      return db.add('bao', entity);
    },
    del: function (id) {
      const condition = {
        idbaocd: id
      }
      return db.del(TBL_BAOCD, condition);
    }
}
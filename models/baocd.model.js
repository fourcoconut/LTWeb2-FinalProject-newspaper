const db = require('../utils/db');

const TBL_BAOCD = 'baochoduyet';

module.exports = {
    all: function () {
        return db.load(`select bcd.*, ttbcd.tentinhtrangbcd from ${TBL_BAOCD} bcd, tinhtrangbcd ttbcd where bcd.idtinhtrangbcd = ttbcd.idtinhtrangbcd and bcd.idtinhtrangbcd = 1`);
    },
    all1: function () {
      return db.load(`select bcd.*, ttbcd.tentinhtrangbcd from ${TBL_BAOCD} bcd, tinhtrangbcd ttbcd where bcd.idtinhtrangbcd = ttbcd.idtinhtrangbcd and (bcd.idtinhtrangbcd = 2 or bcd.idtinhtrangbcd = 3)`);
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
    patch: function (entity) {
      const condition = {
        idbaocd: entity.idbaocd
      }
      delete entity.idbaocd;
      return db.patch(TBL_BAOCD, entity, condition);
    },
    del: function (id) {
      const condition = {
        idbaocd: id
      }
      return db.del(TBL_BAOCD, condition);
    }
}
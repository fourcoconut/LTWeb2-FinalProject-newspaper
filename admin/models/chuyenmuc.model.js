const db = require('../../utils/db');

const TBL_CHUYENMUC = 'chuyenmuc';

module.exports = {
    all: function () {
        return db.load('select * from chuyenmuc');
    },
    LayIDTL: function () {
      return db.load(`select idtheloai from chuyenmuc where idchuyenmuc = ${id}`);
    },
    single: function (id) {
        return db.load(`select * from ${TBL_CHUYENMUC} where CatID = ${id}`);
      },
      add: function (entity) {
        return db.add(TBL_CHUYENMUC, entity);
      },
      patch: function (entity) {
        const condition = {
          CatID: entity.CatID
        }
        delete entity.CatID;
        return db.patch(TBL_CHUYENMUC, entity, condition);
      },
      del: function (id) {
        const condition = {
          CatID: id
        }
        return db.del(TBL_CHUYENMUC, condition);
      }
};
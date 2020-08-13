const db = require('../utils/db');

const TBL_CHUYENMUC = 'chuyenmuc';

module.exports = {
    all: function () {
        return db.load(`select cm.idchuyenmuc, tl.tentheloai, cm.tenchuyenmuc from ${TBL_CHUYENMUC} cm, theloaibao tl where cm.idtheloai = tl.idtheloaibao`);
    },
    alltl: function () {
      return db.load(`select * from theloaibao`);
  },
    single: function (id) {
        return db.load(`select * from ${TBL_CHUYENMUC} where idchuyenmuc = ${id}`);
      },
      add: function (entity) {
        return db.add(TBL_CHUYENMUC, entity);
      },
      patch: function (entity) {
        const condition = {
          idchuyenmuc: entity.idchuyenmuc
        }
        delete entity.idchuyenmuc;
        return db.patch(TBL_CHUYENMUC, entity, condition);
      },
      del: function (id) {
        const condition = {
          idchuyenmuc: id
        }
        return db.del(TBL_CHUYENMUC, condition);
      }
};
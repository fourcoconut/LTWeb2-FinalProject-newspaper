const db = require('../../utils/db');

const TBL_THELOAI = 'theloaibao';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_THELOAI}`);
    },
    allTLANDCM: function () {
      return db.load(`select tl.*, cm.*,cm1.tenchuyenmuc as tenchuyenmuc1 from theloaibao tl join chuyenmuc cm on tl.idtheloaibao = cm.idtheloai join chuyenmuc cm1 on cm.idtheloai = cm1.idtheloai where cm.tenchuyenmuc != cm1.tenchuyenmuc limit 0, 3`);
    },
    single: function (id) {
        return db.load(`select * from ${TBL_THELOAI} where idtheloaibao = ${id}`);
      },
      add: function (entity) {
        return db.add(TBL_THELOAI, entity);
      },
      patch: function (entity) {
        const condition = {
          idtheloaibao: entity.idtheloaibao
        }
        delete entity.idtheloaibao;
        return db.patch(TBL_THELOAI, entity, condition);
      },
      del: function (id) {
        const condition = {
          idtheloaibao: id
        }
        return db.del(TBL_THELOAI, condition);
      }
}
const db = require('../utils/db');

const TBL_BAO = 'bao';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_BAO}`);
    },
    pageBao: function (id, limit, offset) {
        return db.load(`select b.*, cm.tenchuyenmuc from ${TBL_BAO} b, chuyenmuc cm where b.idchuyenmuc = ${id} and b.idchuyenmuc = cm.idchuyenmuc limit ${limit} offset ${offset}`);
    },
    timBao: function (dulieu) {
      return db.load(`select b.*, cm.tenchuyenmuc from bao b, chuyenmuc cm where MATCH(tieude, noidung, noidungchinh) against('${dulieu}') and b.idchuyenmuc = cm.idchuyenmuc`);
    },
    countBao: async function (id, limit, offset) {
        const rows = await db.load(`select count(*) as total from ${TBL_BAO} where idchuyenmuc = ${id}`);
        return rows[0].total;
    },
    addcd: function (entity) {
      return db.add('baochoduyet', entity);
    },
    //thêm
    addcm: function (entity) {
      return db.add('binhluan', entity);
    },
    //
    single: function (id) {
      return db.load(`select b.*, cm.tenchuyenmuc from ${TBL_BAO} b, chuyenmuc cm where b.idbao = ${id} and b.idchuyenmuc = cm.idchuyenmuc`);
    },
    patch: function (entity) {
      const condition = {
        idbao: entity.idbao
      }
      delete entity.idbao;
      return db.patch(TBL_BAO, entity, condition);
    },
    allbl: function (id) {
      return db.load(`select bl.*, tk.ten from binhluan bl, taikhoan tk where bl.idbao = ${id} and tk.idtk = bl.idtk`);
    },
    singletk: function (id) {
      return db.load(`select * from taikhoan where idtk = ${id}`);
    }
}
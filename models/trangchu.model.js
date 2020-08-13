const db = require('../utils/db');

const TBL_TrangChu = 'bao';

module.exports = {
    MoiNhat: function (id, limit, offset) {
        return db.load(`select b.*, cm.tenchuyenmuc from ${TBL_TrangChu} b, chuyenmuc cm where b.idchuyenmuc = cm.idchuyenmuc order by ngaydang desc limit 12`);
    },
    XemNhieuNhat: function (id, limit, offset) {
        return db.load(`select b.*, cm.tenchuyenmuc from ${TBL_TrangChu} b, chuyenmuc cm where b.idchuyenmuc = cm.idchuyenmuc order by slxem desc limit 12`);
    },
    HotNhat: function (id, limit, offset) {
        return db.load(`select b.*, cm.tenchuyenmuc from ${TBL_TrangChu} b, chuyenmuc cm where b.idchuyenmuc = cm.idchuyenmuc order by slxem + slbinhluan desc limit 4`);
    }
}
const db = require('../../utils/db');

const TBL_BAO = 'bao';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_BAO}`);
    }
}
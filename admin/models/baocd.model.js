const db = require('../../utils/db');

const TBL_BAOCD = 'baochoduyet';

module.exports = {
    all: function () {
        return db.load(`select * from ${TBL_BAOCD}`);
    }
}
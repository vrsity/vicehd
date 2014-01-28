var moment = require('moment');
module.exports = {
  viceTimestamp: function (d) {
    return moment(d).format('YYYY MMM D');
  }
};

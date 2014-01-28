var Backbone = require('backbone');
var dateHelpers = require('./date_helpers');
require('../vendor/backbone-presenter');

module.exports = Backbone.Presenter.extend({
  customAttributes: {
    humanDate: function () {
      return dateHelpers.viceTimestamp(this.attributes.date);
    }
  }
});

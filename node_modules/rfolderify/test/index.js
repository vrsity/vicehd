var browserify = require('browserify');

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var assert = require('assert');

describe('rfolder(path)', function () {
  it('turns folders into requires', function (done) {
    var b = browserify();
    b.add(__dirname + '/files/sample.js');
    b.transform(path.dirname(__dirname));

    b.bundle(function (err, src) {
      if (err) throw err;
      vm.runInNewContext(src, { console: { log: log } });
    });

    function log (test) {
      assert.equal(test.a,5);
      done();
    }
  })
});
var expect = require('chai').expect;

var window = require('jsdom').jsdom().createWindow();
var $ = require('jquery/dist/jquery')(window);
require('../index')($);

describe('#replaceClass', function () {
  var $el = $('<div id="el">');
  var classA = 'animate-foo';
  var classB = 'animate-bar';

  beforeEach(function () {
    $el.removeClass().addClass(classA);
  });

  it('replaces a class using a string', function () {
    $el.replaceClass(classA, classB);
    expect($el.attr('class')).to.equal(classB);
  });

  it('replaces a class using regexp', function () {
    $el.addClass('animate-baz');
    $el.replaceClass(/animate/, classB);
    expect($el.attr('class')).to.equal(classB);
  });

  it('removes matching classes when no 2nd argument is passed', function () {
    $el.addClass('foo');
    $el.replaceClass(/animate/);
    expect($el.attr('class')).to.equal('foo');
  });

});


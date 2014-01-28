var removeTest = function (test, subject) {
  if ('function' === typeof test.test) {
    return test.test(subject);
  } else {
    return test === subject;
  }
};

module.exports = function (a, b) {
  for (var i=0, l=this.length; i < l; i++) {
    var el = this[i];
    if (el.nodeType === 1) {
      var classNames = el.className.split( /\s+/ );
      for (var n = classNames.length; n--; ) {
        if (removeTest(a, classNames[n]) ) classNames.splice(n, 1);
      }
      if (b) classNames.push(b);
      el.className = classNames.join(' ');
    }
  }
};

var Handlebars = require('handlebars');

exports.wrapCharacters = function (text) {
  if (!text) return '';
  var split = text.split('');
  var string = '';
  for (var i = 0, len = split.length; i < len; i++) {
    string += '<span>'+split[i]+'</span>';
  }
  return new Handlebars.SafeString(string);
};

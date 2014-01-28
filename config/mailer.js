var nodemailer = require("nodemailer");
var smtp;

exports.configure = function (app) {
  var options;

  if ('production' === app.get('env')) {
    options = { service: 'Mailgun', auth: { user:'postmaster@sandbox9411.mailgun.org' , pass: '3-vbkb0qx3f7' } };
  }

  if ('development' === app.get('env')) {
    options = { host: '127.0.0.1' , port: 1025 };
    console.log('configuting SMTP', options);
  }

  smtp = nodemailer.createTransport('SMTP', options);
};

exports.smtp = smtp;

exports.send = function () {
  return smtp.sendMail.apply(null, arguments);
};


var nodemailer = require("nodemailer");
var smtp;

exports.configure = function (app) {
  var options;

  if ('production' === app.get('env')) {
    options = { service: 'Mailgun', auth: app.get('mail_auth') };
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


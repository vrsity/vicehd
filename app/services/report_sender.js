var mailer = require('../../config/mailer');
var _ = require('underscore');

var app = {};
app.get = function () {
  return process.env.NODE_ENV || 'development';
};

mailer.configure(app);

function ReportSender(options) {
  _.extend(this, options);
}

module.exports = ReportSender;

ReportSender.send = function(options, done) {
  return new ReportSender(options).send(done);
};

var p = ReportSender.prototype;

p.body = function () {
  var toLink = function (url) {
    return '<a href="'+url+'">'+url+'</a>';
  };

  var newShowLinks  = this.newShows.map(function (s) { return toLink(s.url()); }).join('<br>');
  var newEpisodeLinks  = this.newEpisodes.map(function (e) { return toLink(e.url()); }).join('<br>');

  var content = [];
  if (newShowLinks.length) {
    content.push('New Shows');
    content.push(newShowLinks);
    content.push('<br>');
  }

  if (newEpisodeLinks.length) {
    content.push('New Episodes');
    content.push(newEpisodeLinks);
  }

  if (!content.length) {
    content.push('Nothing to report :(');
  }
  return content.join('<br>');
};

p.to = function () {
  var to = ['moudy.elkammash@gmail.com'];
  if (this.newShows.length || this.newEpisodes.length) {
    to.push('e@varsity.is');
  }
  return to.join(',');
};

p.send = function (done) {
  var subject = 'ViceHD: '+this.newShows.length+' new shows, '+this.newEpisodes.length+' new episodes';

  var mailOptions = {
    from: "scrape@vice-hd.com"
  , to: this.to()
  , subject: subject
  , text: this.body()
  , html: this.body()
  };

  console.log('Sending report', mailOptions);
  mailer.send(mailOptions, function(error, response){
    if(error){
      console.log(error);
    }else{
      console.log("Message sent: " + response.message);
    }
    done(error);
  });

};


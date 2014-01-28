var moment = require('moment');
var secondsToTime = require('../../lib/seconds_to_time');
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var schemaOptions = {
  toObject: {
    virtuals: true
  }
, toJSON: {
    virtuals: true
  }
};

var EpisodeSchema = new Schema({
  title: { type: String, required:true, trim:true }
, titleLowerCase: { type: String, trim:true }
, description: { type: String, trim:true }
, thumbnailUrl: { type: String, required:true, trim:true }
, path: { type: String, required:true, trim:true, unique:true, index:true }
, pathLowerCase: { type: String, trim:true }
, date: { type: Date }
, author: { type: String, trim:true }
, authorPath: { type: String, trim:true }
, category: { type: String, trim:true }
, categoryPath: { type: String, trim:true }
, showPath: { type: String, required:true, trim:true }
, showTitle: { type: String, trim:true }
, youtubeTitle: { type: String, trim:true }
, youtubeId: { type: String, trim:true }
, videoId: { type: String, trim:true }
, playerId: { type: String, trim:true }
, duration: { type: String, trim:true }
}, schemaOptions);

EpisodeSchema.plugin(findOrCreate);

EpisodeSchema.virtual('humanDate').get(function () {
  return moment(this.date).format('MMM D YYYY');
});

EpisodeSchema.virtual('humanDuration').get(function () {
  if (this.duration) {
    return secondsToTime(this.duration);
  }
});

EpisodeSchema.pre('save', function (next) {
  this.titleLowerCase = this.title && this.title.toLowerCase();
  next();
});

EpisodeSchema.pre('save', function (next) {
  this.pathLowerCase = this.path && this.path.toLowerCase();
  next();
});

EpisodeSchema.methods.url = function () {
  return 'http://www.vice.com'+this.path;
};

EpisodeSchema.statics.findByPage = function (page, cb) {
  var perPage = 20;
  page = page || 1;
  var query = this.find();
  query = query.sort({ date: 'desc', id: 'desc' });
  query = query.limit(20).skip((page - 1)*perPage);
  query.exec(cb);
};

EpisodeSchema.statics.findAll = function (cb) {
  var query = this.find();
  query = query.sort({ date: 'asc', id: 'desc' });
  query.exec(cb);
};

EpisodeSchema.statics.findByShow = function (show, cb) {
  var query = this.find();
  if (!show.match(/^\//)) show = '/'+show;
  query = query.where({ showPath: show });
  query.exec(cb);
};

module.exports = mongoose.model('Episode', EpisodeSchema, 'episodes');

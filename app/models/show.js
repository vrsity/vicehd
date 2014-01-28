var moment = require('moment');
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

var ShowSchema = new Schema({
  title: { type: String, required:true, trim:true }
, titleLowerCase: { type: String, trim:true }
, thumbnailUrl: { type: String, required:true, trim:true }
, path: { type: String, required:true, trim:true, index: true, unique: true }
, pathLowerCase: { type: String, trim:true }
, description: { type: String, trim:true }
, episodeCount: { type: Number, default: 0 }
, newestEpisodeDate: { type: Date }
}, schemaOptions);

ShowSchema.plugin(findOrCreate);

ShowSchema.virtual('humanDate').get(function () {
  return moment(this.newestEpisodeDate).format('MMM D YYYY');
});

ShowSchema.pre('save', function (next) {
  this.titleLowerCase = this.title && this.title.toLowerCase();
  next();
});

ShowSchema.pre('save', function (next) {
  this.pathLowerCase = this.path && this.path.toLowerCase();
  next();
});

ShowSchema.methods.url = function () {
  return 'http://www.vice.com'+this.path;
};

ShowSchema.statics.findAll = function (cb) {
  var query = this.find();
  query = query.sort({ titleLowerCase: 'asc' });
  query.exec(cb);
};

module.exports = mongoose.model('Show', ShowSchema, 'shows');

var Show = require('../app/models/show');
var Episode = require('../app/models/episode');

exports.configure = function (app) {

  app.get('/api/episodes', function (req, res) {
    Episode.findByPage(req.query.page, function (err, items) {
      res.send({ episodes: items });
    });
  });

  app.put('/api/episodes/:id', function (req, res) {
    Episode.findByIdAndUpdate(req.params.id, {duration: req.body.duration}, function (err, episode) {
      res.send({episode: episode});
    });
  });

  app.get('/api/shows', function (req, res) {
    Show.findAll(function (err, items) {
      res.send({ shows: items });
    });
  });

  app.get('/api/shows/:show', function (req, res) {
    Show.findOne({path: '/'+req.params.show}, function (err, show) {
      Episode.findByShow(req.params.show, function (err, items) {
        res.send({ show: show, episodes: items });
      });
    });
  });

  app.get('/api/shows/:show/episodes', function (req, res) {
    Episode.findByShow(req.params.show, function (err, items) {
      res.send({ episodes: items });
    });
  });

  app.get('/', function (req, res) {
    Episode.findByPage(1, function (err, items) {
      res.render('index', { episodes: JSON.stringify(items) });
    });
  });

  app.get('/shows', function (req, res) {
    Show.findAll(function (err, items) {
      res.render('index', { shows: JSON.stringify(items) });
    });
  });

  app.get('/:showSlug', function (req, res) {
    Show.findOne({path: '/'+req.params.showSlug}, function (err, show) {
      Episode.findByShow(req.params.showSlug, function (err, items) {
        res.render('index', {
          episodes: JSON.stringify(items)
        , show: JSON.stringify(show)
        });
      });
    });
  });

  app.get('/:showSlug/:slug', function (req, res) {
    Show.findOne({path: '/'+req.params.showSlug}, function (err, item) {
      Episode.findByShow(req.params.showSlug, function (err_, items) {
        res.render('index', { show: JSON.stringify(item), episodes: JSON.stringify(items) });
      });
    });
  });

};

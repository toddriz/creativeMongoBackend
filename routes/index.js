var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var picture = mongoose.model('Picture');

router.param('picture', function (req, res, next, id) {
  var query = picture.findById(id);
  query.exec(function (err, picture) {
    if (err) { return next(err); }
    if (!picture) { return next(new Error("can't find picture")); }
    req.picture = picture;
    return next();
  });
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/pictures', function (req, res, next) {
  picture.find(function (err, pictures) {
    if (err) { return next(err); }
    res.json(pictures);
  });
});

router.get('/pictures/:picture', function (req, res) {
  res.json(req.picture);
});

router.post('/pictures', function (req, res, next) {
  console.log('hi');
  var picture = new Picture(req.body);
  picture.save(function (err, picture) {
    if (err) { return next(err); }
    res.json(picture);
  });
});

router.delete('/pictures/:picture', function (req, res) {
  console.log("in Delete");
  req.picture.remove();
  res.sendStatus(200);
});

module.exports = router;

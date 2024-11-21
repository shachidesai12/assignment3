var express = require('express');
var router = express.Router();
const passport = require('passport');
const DB = require('../config/db');


/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});



module.exports = router;

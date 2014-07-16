var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/cars', function(req, res) {
    var db = req.db;
    var winner = "Honda Civic!";
    var collection = db.get('cars');
    collection.find({'year': {$gte:2009}, 'z2h': {$gte:0.1}},{},function(e,docs){
        res.render('cars', {
            "cars" : docs,
            "winner": winner
        });
    });
});

module.exports = router;



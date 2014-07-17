var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET cars page. */
router.get('/cars', function(req, res) {
    var db = req.db;
    var winner = "Honda Civic!";
    var collection = db.get('cars');

    collection.find({'year': 2005},{},function(e,docs){
        res.render('cars', {
            "cars" : docs,
            "winner": winner
        });
    });
});

/* GET cars page. */
router.get('/random', function(req, res) {
    var db = req.db;
    var collection = db.get('cars');
    var rand = Math.floor(Math.random() * (58411 + 1));

    collection.findOne({'rand': rand},{},function(e,doc){
        res.render('random', {
            "car" : doc,
            "disp": (doc.engine.displacement/1000).toFixed(1)
        });
    });
});

/* GET car page. */
router.get('/cars/test-car', function(req, res) {
    var db = req.db;
    var winner = "Honda Civic!";
    var civic = {'make': 'Honda', 'year': 2000, 'model': 'Civic', 'trim': '1.4', 'body': 'Hatchback'};
    var bmw = {"trim" : "Cd Cabriolet", "year" : 2006, "model" : "320", "make" : "Bmw", "body" : "Convertible"};
    var subaru = {"trim" : "Sport", "body" : "Pickup", "model" : "Baja", "make" : "Subaru", "year" : 2006};
    var ariel = {"trim" : "", "body" : "Roadster", "model" : "Atom", "year" : 2005, "make" : "Ariel"}

    var collection = db.get('cars');
    collection.findOne(ariel,{},function(e,doc){
        res.render('car', {
            "car" : doc,
            "winner": winner,
            "disp": (doc.engine.displacement/1000).toFixed(1)
        });
    });
});

router.get('/car/:slug', function(req, res) {
    var db = req.db;
    var winner = "Honda Civic!";
    var collection = db.get('cars');
    collection.findOne({'slug': req.params.slug},{},function(e,doc){
        res.render('car', {
            "car" : doc,
            "winner": winner,
            "disp": (doc.engine.displacement/1000).toFixed(1)
        });
    });
 
});

module.exports = router;



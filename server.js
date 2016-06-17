var express = require('express');
var bodyParser = require('body-parser');
var CV = require ('./schema/CV.js');

/** Mongo database **/
var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/cv');

var app = express();
var router = express.Router();

router.use(function(req, res, next){
  console.log("==============================================================");
  console.log(req.body);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(8080, function() {
  console.log("App running on port 8080");
});


router.route('/cv')
  .get(function(req, res){
    CV.find({}, function(err, cvs){
      if(err) {
        res.json(err);
      }
      res.json(cvs);
    });
  })
  .post(function(req, res){
    var cv = new CV();
    cv.employee = req.body.employee;
    cv.save(function(err) {
      if(err) res.json(err);
      res.json(cv);
    });
  })
  .put(function(req, res){
    console.log("finding: " + req.body.employee.email);
    CV.findById( req.body._id, function(err, cv){
      if(err) {
        res.json(err);
      }

      cv.employee = req.body.employee;

      cv.save(function(err) {
        if(err) {
          res.json(err);
        } else {
          console.log("updated: " + cv.employee.email);
          res.json(cv);
        }
      });
    });
  })
  .delete(function(req, res) {
    console.log("Deleting cv: " + req.body.employee.email);
    CV.remove({_id: req.body._id}, function(err, bear) {
      if(err) {
        res.json(err);
      } else {
        res.json({message: "CV Removed"});
      }
    });
  });

app.use("/api", router);

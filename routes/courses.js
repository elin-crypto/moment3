var express = require('express');
var router = express.Router();

const fs = require('fs');
var rawdata = fs.readFileSync('json/courses.json'); // Wait for the data to be retrieved
var courses = JSON.parse(rawdata);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(courses);
});

/*******************************************************
* GET course listing.
********************************************************/
router.get('/', function(req, res, next) {
  res.send(courses);
});

/*******************************************************
* GET single course
********************************************************/

router.get('/:id', function(req, res, next){
  var id = req.params.id;
  var del = -1;
  for(var i=0; i < courses.length; i++){
    if(courses[i]._id == id) del = i; // Find the array index that holds _id = id
      console.log(i);
    }
    if(del>=0) {
      res.send(courses[del]);
    }
    
  });



/*******************************************************
* POST/Create new course
********************************************************/
router.post('/', function(req, res, next){
  // Get current id
  let max = 0;
  courses.forEach(function(elem){
    if(elem._id > max) max = elem._id;
  });
  // Create new post
  let newC = {};
  newC._id = max+1;
  newC.courseId = req.body.courseId;
  newC.courseName = req.body.courseName;
  newC.coursePeriod = req.body.coursePeriod;
  
  courses.push(newC);

  /*********************************************
  * Update user file
  *********************************************/
  fs.writeFile('json/courses.json', JSON.stringify(courses), 'utf8', function(err) {
    if (err) throw "Couldn't write to file!"+err;
  });
      
  res.send(courses);
});

/*******************************************************
* DELETE uniqe course
********************************************************/
router.delete('/:id', function(req, res, next){
  var id = req.params.id;
  var del=-1;
  for(var i=0; i < courses.length; i++){
    if(courses[i]._id == id) del = i; // Find the array index that holds _id = id
      console.log(i);
    }
    if(del>=0) {
      status = courses.splice(del, 1); // Delete element and rearrange the array indexes
    }
    
    // res.contentType('application/json');
    fs.writeFile('json/courses.json', JSON.stringify(courses), 'utf8', function(err) {
      if (err) throw "Couldn't write to file!"+err;
      }
      );
  res.send(courses);
  });

module.exports = router;

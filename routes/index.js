var express = require('express');
var router = express.Router();
// Use the mysql module to connect, and query from express/node
// the mysql module, is NOT part of core so... we need to npm install
var mysql      = require('mysql');
const config = require('../config');
var connection = mysql.createConnection(config);
connection.connect();


router.get('/', function(req, res, next) {
  // we want to load up a list of our 
  // restaurants on the homepage.
  // These are inside of mysql.
  // inside this route, BEFORE we res.render a view
  // we want to query the db and get the data.
  // then we can send it over to the view
  const query = 'SELECT * FROM restaurant;'
  connection.query(query,(err, results)=>{
    if (err){
      throw err;
    }else{
      res.json(results);
    }
  });
});

router.get('/takeout',(req, res)=>{
  const takeOutQuery = 'SELECT name,distance,stars,category FROM restaurant WHERE takeout = 1;';
  connection.query(takeOutQuery,(err, results)=>{
    if (err){
      throw err;
    }
    res.json(results);
  })
})


module.exports = router;

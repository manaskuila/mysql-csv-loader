const fs = require("fs");
require('dotenv').config();
//const mysql = require("mysql");
const fastcsv = require("fast-csv");
const pool = require("C:/Nodejs/mysql-csv-loader/config/database");

let stream = fs.createReadStream("category.csv");
let csvData = [];
let csvStream = fastcsv
  .parse()
  .on("data", function(data) {
    csvData.push(data);
  })
  .on("end",function() {
    // remove the first line: header
    csvData.shift();

    // open the connection
    //function(callBack){
    pool.query(`INSERT INTO category (id, name, description, created_at) VALUES ?`,
    [csvData],
  function(error, results, fields) {
      if (error) {
        console.log(error); 
      // return callBack(error);
      }
      console.log(results)
     // return callBack(null, results);
    }

  );
});

stream.pipe(csvStream);
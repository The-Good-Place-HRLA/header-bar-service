var pg = require('pg');
// import pg from 'pg';
// var format = require('pg-format');
var PGDATABASE = 'rei';
var PGHOST = '172.31.6.14';
var PGUSER = 'postgres';
var PGPASSWORD = 'manuel23';

var config = {
    user: PGUSER, // name of the user account
    password: PGPASSWORD,
    host: PGHOST,
    database: PGDATABASE, // name of the database
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
  }

var pool = new pg.Pool(config);

var myClient;
var hi = pool.connect(function (err, client, done) {
    if (err) console.log(err)
    myClient = client
    console.log("Postgres is PostGreat")
})
module.exports = pool;

// var productQuery = format('SELECT * from searchitems WHERE id = %L', 1)
// myClient.query(productQuery, function (err, result) {
//   if (err) {
//     console.log(err)
//   }
//   console.log(result.rows[0])
// })
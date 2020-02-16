const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongoURI = 'mongodb://localhost/rei';

mongoose.set('useCreateIndex', true);

var searchSchema = mongoose.Schema({
  id: { type: Number, unique: true },
  productname: { type: String, lowercase: true, trim: true }

});
// searchSchema.index({productname: 1});
var db = mongoose.connect(mongoURI, {useNewUrlParser: true})
  .then(() => console.log('\u001b[1;35mMongoDB Connected\u001B[37m'));

var searchModel = mongoose.model('searchitem', searchSchema);

module.exports = searchModel;

// var mongodb = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var db;
// MongoClient.connect("mongodb://localhost:3001/rei", function(err, database) {
//   if(err) return console.error(err);

//   db = database;

//   // the Mongo driver recommends starting the server here because most apps *should* fail to start if they have no DB.  If yours is the exception, move the server startup elsewhere. 
// });


// var mongodb = require('mongodb');
// var uri = 'mongodb://localhost:27017/dbname';

// module.exports = function(callback) {
//   mongodb.MongoClient.connect(uri, callback);
// };


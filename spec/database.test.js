const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const models = require('../database/models.js');
const Mongo = require('../database/index.js');
const Postgres = require('../database/postgres.js');
const fs = require('fs');



describe('database', () => {

  // importing models will actually create the connection for us!
  // just make sure we dump everything before we start!
  // xbeforeAll(async (done) => {
  //   await mongoose.connection.collections['searchitems'].deleteMany();
  //   done();
  // });

  // xafterAll(async (done) => {
  //   await mongoose.connection.close(true)
  //   done();
  // });

  xtest ('should get all the items', (done) => {
    var sampleSearches = [{ id: 1, name: "testItem1" }, { id: 2, name: "testItem2" }, { id: 3, name: "testItem3" }];
    return models.addItems(sampleSearches)
      .then(() => {
        return models.getAll();
      })
      .then(dbResponse => {
        expect(dbResponse.length).toBe(3);
        done();
      });
  });
  
  xtest ('adds a search entry', (done) => {
    return models.addItems({id: 1000, name: "test_item"})
    .then(() => {
      return models.getAll();
    })
    .then(dbResponse => {
      expect(dbResponse[0]).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String)
      }));
      done();
    });
  });
});

// describe("mongoDB testing", ()=>{

//   test('does a query', async ()=> {
//     let regexString = '';
//     var word = 'chair';

//     // this loop builds a regEx expression that ignores whitespace between all characters
//     // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
//     for (var i = 0; i < word.length; i++) {
//       regexString += '\\s*' + word[i];
//     }
//     // add a regex value for spaces after as well
//     regexString += '\\s*';
//     var re = new RegExp(regexString); 
//     var item =  {productname: {$regex: re, $options: 'i'}}
//     var stuff = [];

//      for( var x = 0; x < 10; x++ ) {
//       await models.getProductByMatch(item)
//         .then(result =>{
//           stuff.push(result[0].executionStats.executionTimeMillis)
//         })  
//     }

//     console.log(stuff)
//     // return models.getProductByMatch(item)
//     // .then(result =>{
//     //   console.log(result[0].executionStats.executionTimeMillis)
//     //   expect(result[0].executionStats).toEqual(result[0].executionStats)
//     // })
//   })
//   // console.log(result[0].executionStats.executionTimeMillis)
  
// })
var customerX=0;
describe("limit 10 from last 10%", ()=>{
  // var searchterm = ['a','e','i','o','u','z','w','q','x','v','met','tast', 'Incre','', 'dsajbdfldaisdskbsalk','re', 'gr', 'ab', 'Gorgeous Steel Chair', 'Generic Rubber Computer','Gorgeous Rubber Fish','Tasty Metal Table','Handmade Granite Table','Handmade Steel Ball','Awesome Soft Shoes'];
  // var searchterm = ['met', 'tast', 'Incre', 're', 'gr', 'ab','Gorgeous Rubber Fish','Tasty Metal Table','Handmade Granite Table','a','e','i','o','u'];
  // var searchterm = ['', '-1', 'x', '@', '{}'];
  var searchterm = ['shirt', 'pants', 'hat', 'amazing', 'great', 'big', 'small', 'red', 'blue', 'steel', 'cotton']
  // var searchterm = ['T', 'Ta', 'Tas', 'Tast', 'Tasty', 'Tasty M', 'Tasty Me', "Tasty Met", 'Tasty Meta', 'Tasty Metal', 'Tasty Metal K', 'Tasty Metal Ke', 'Tasty Metal Key', 'Tasty Metal Keyb', 'Tasty Metal Keybo', 'Tasty Metal Keyboa', 'Tasty Metal Keyboar','Tasty Metal Keyboard', 'Tasty Metal Keyboard9466802']
  test('Mongo', async ()=> {
    
    var mongoSpeedResults = [];
    var postgresSpeedResults = [];
    
    // for( var x = 0; x < 1; x++ ) {
      
    //   var mongoResults = await Mongo.find(item).limit(10);
    //   // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
    //   var x = 0;
    //   while (x < 10) {
    //     queryResults.push(mongoResults[x]['productname']);
    //     x++;
    //   }
    // }
     for( var iteration = 0; iteration < 50; iteration++ ) {
      // let mongoQueryResults = [];
      // let postgresQueryResults = [];

      let regexString = '';
      var word = searchterm[Math.floor(Math.random() * 11)];

      var search = `%${word}%`;
  
      // this loop builds a regEx expression that ignores whitespace between all characters
      // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
      for (var i = 0; i < word.length; i++) {
        regexString += '\\s*' + word[i];
      }
      // add a regex value for spaces after as well
      regexString += '\\s*';
      var re = new RegExp(regexString); 
      var item =  {productname: {$regex: re, $options: 'i'}}
      // , id: { $gt: 9000000 }
//for query results uncomment
      // var mongoResults = await Mongo.find(item).limit(10);
      // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
      // var x = 0;
      // while (x < 10) {
      //   if(mongoResults[x] === undefined){
      //     x++;
      //     continue;
      //   }
      //   mongoQueryResults.push(mongoResults[x]['productname']);
      //   x++;
      // }

      // var postgresResults = await Postgres.query(`SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
      // speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
      // queryResults.push(postgresResults)
      // var y = 0;
      // while (y < 10) {
      //   if(postgresResults[y] === undefined){
      //     y++;
      //     continue;
      //   }
      //   postgresQueryResults.push(postgresResults[y]['productname']);
      //   // console.log(customerX)
      //   y++;
      // }


      var mongoResults = await Mongo.find(item).limit(10).explain("executionStats");
      // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
      mongoSpeedResults.push(mongoResults[0]['executionStats']['executionTimeMillis'])

      var postgresResults = await Postgres.query(`EXPLAIN ANALYZE SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
      postgresSpeedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3)));
      // speedResults.push(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3))
//for query results uncomment
      // console.log(`Query results of ${word} for Mongo: `,mongoQueryResults);
      // console.log(`Query results of ${word} for postgres: `,postgresQueryResults)
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log(`Average speed of Mongo query in ms: `,(mongoSpeedResults.reduce(reducer, 0)/iteration).toFixed(2));
    console.log('Average speed of Postgres query in ms: ',(postgresSpeedResults.reduce(reducer, 0)/iteration).toFixed(2));
    // console.log('speeds', speedResults)
    

  }) 
  xtest('Postgres', async ()=> {
    var word = 'Gorgeous Steel Chair';
    

    
    
    for( var x = 0; x < 1; x++ ) {
      var postgresResults = await Postgres.query(`SELECT * FROM searchitems WHERE productname ILIKE $1 AND id > 9000000 LIMIT 10`, [search]).then(data=> {return data.rows})
      // speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
      // queryResults.push(postgresResults)
      while (x < 10) {
        postgresQueryResults.push(postgresResults[x]['productname']);
        x++;
      }
    }
     for( var x = 0; x < 100; x++ ) {
      var postgresResults = await Postgres.query(`EXPLAIN ANALYZE SELECT * FROM searchitems WHERE productname ILIKE $1 AND id > 9000000 LIMIT 10`, [search]).then(data=> {return data.rows})
      postgresSpeedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3)));
      // speedResults.push(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3))
    }
    // ['Execution Time'].slice(0, postgresResults[5]['QUERY PLAN']['Execution Time']-3)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log('Average speed of Postgres Query in ms: ',(postgresSpeedResults.reduce(reducer, 0)/x).toFixed(2));
    
    // console.log("hi", speedResults)
  }) 
  
})
// describe("Postgres", ()=>{

//   test('limit 10 from last 10%', async ()=> {
//     var word = 'c';
//     var search = `%${word}%`;

//     var speedResults = [];
//     var queryResults = [];
//     for( var x = 0; x < 1; x++ ) {
//       var postgresResults = await Postgres.query(`SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
//       // speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
//       // queryResults.push(postgresResults)
//       while (x < 10) {
//         queryResults.push(postgresResults[x]['productname']);
//         x++;
//       }
//     }
//      for( var x = 0; x < 1; x++ ) {
//       var postgresResults = await Postgres.query(`EXPLAIN ANALYZE SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
//       speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
//       // speedResults.push(postgresResults)
//     }
//     // ['Execution Time'].slice(0, postgresResults[5]['QUERY PLAN']['Execution Time']-3)
//     const reducer = (accumulator, currentValue) => accumulator + currentValue;
//     console.log('Average speed of Postgres Query in ms: ',(speedResults.reduce(reducer, 0)/x).toFixed(2));
//     console.log('Query results for postgres: ',queryResults)
//   }) 
  
// })









// describe("limit 10 from last 10%", ()=>{
//   var searchterm = ['a', 'b', 'Gorgeous Steel Chair']
//   test('Mongo', async ()=> {
//     let regexString = '';
//     var word = searchterm[Math.floor(Math.random() * 3)];
//     console.log(word)

//     // this loop builds a regEx expression that ignores whitespace between all characters
//     // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
//     for (var i = 0; i < word.length; i++) {
//       regexString += '\\s*' + word[i];
//     }
//     // add a regex value for spaces after as well
//     regexString += '\\s*';
//     var re = new RegExp(regexString); 
//     var item =  {productname: {$regex: re, $options: 'i'}, id: { $gt: 9000000 }}
//     var speedResults = [];
//     var queryResults = [];
//     for( var x = 0; x < 1; x++ ) {
//       var mongoResults = await Mongo.find(item).limit(10);
//       // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
//       var x = 0;
//       while (x < 10) {
//         queryResults.push(mongoResults[x]['productname']);
//         x++;
//       }
//     }
//      for( var x = 0; x < 10; x++ ) {
//       var mongoResults = await Mongo.find(item).limit(10).explain("executionStats");
//       // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
//       speedResults.push(mongoResults[0]['executionStats']['executionTimeMillis'])
//     }
//     const reducer = (accumulator, currentValue) => accumulator + currentValue;
//     console.log(`Average speed of Mongo query in ms: `,(speedResults.reduce(reducer, 0)/x).toFixed(2));
//     // console.log('speeds', speedResults)
//     console.log(`Query results of ${word} for Mongo: `,queryResults)

//   }) 
//   test('Postgres', async ()=> {
//     var word = 'Gorgeous Steel Chair';
//     var search = `%${word}%`;

//     var speedResults = [];
//     var queryResults = [];
//     for( var x = 0; x < 1; x++ ) {
//       var postgresResults = await Postgres.query(`SELECT * FROM searchitems WHERE productname ILIKE $1 AND id > 9000000 LIMIT 10`, [search]).then(data=> {return data.rows})
//       // speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
//       // queryResults.push(postgresResults)
//       while (x < 10) {
//         queryResults.push(postgresResults[x]['productname']);
//         x++;
//       }
//     }
//      for( var x = 0; x < 100; x++ ) {
//       var postgresResults = await Postgres.query(`EXPLAIN ANALYZE SELECT * FROM searchitems WHERE productname ILIKE $1 AND id > 9000000 LIMIT 10`, [search]).then(data=> {return data.rows})
//       speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3)));
//       // speedResults.push(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[postgresResults.length-1]['QUERY PLAN'].length-3))
//     }
//     // ['Execution Time'].slice(0, postgresResults[5]['QUERY PLAN']['Execution Time']-3)
//     const reducer = (accumulator, currentValue) => accumulator + currentValue;
//     console.log('Average speed of Postgres Query in ms: ',(speedResults.reduce(reducer, 0)/x).toFixed(2));
//     console.log('Query results for postgres: ',queryResults)
//     // console.log("hi", speedResults)
//   }) 
  
// })
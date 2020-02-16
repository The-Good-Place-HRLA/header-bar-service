const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const models = require('../database/models.js');
const Mongo = require('../database/index.js');
const Postgres = require('../database/postgres.js');

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
describe("Mongo", ()=>{

  test('limit 10 from last 10%', async ()=> {
    let regexString = '';
    var word = 'c';

    // this loop builds a regEx expression that ignores whitespace between all characters
    // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
    for (var i = 0; i < word.length; i++) {
      regexString += '\\s*' + word[i];
    }
    // add a regex value for spaces after as well
    regexString += '\\s*';
    var re = new RegExp(regexString); 
    var item =  {productname: {$regex: re, $options: 'i'}}
    var speedResults = [];
    var queryResults = [];
    for( var x = 0; x < 1; x++ ) {
      var mongoResults = await Mongo.find(item).limit(10);
      // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
      var x = 0;
      while (x < 10) {
        queryResults.push(mongoResults[x]['productname']);
        x++;
      }
    }
     for( var x = 0; x < 1; x++ ) {
      var mongoResults = await Mongo.find(item).limit(10).explain("executionStats");
      // speedResults.push(mongoResults[0].executionStats.executionTimeMillis)
      speedResults.push(mongoResults[0]['executionStats']['executionTimeMillis'])
    }
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // console.log('Average speed of Mongo query in ms: ',(speedResults.reduce(reducer, 0)/x).toFixed(2));
    console.log('speeds', speedResults)
    console.log('Query results fo Mongo: ',queryResults)

  }) 
  
})
describe("Postgres", ()=>{

  test('limit 10 from last 10%', async ()=> {
    var word = 'c';
    var search = `%${word}%`;

    var speedResults = [];
    var queryResults = [];
    for( var x = 0; x < 1; x++ ) {
      var postgresResults = await Postgres.query(`SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
      // speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
      // queryResults.push(postgresResults)
      while (x < 10) {
        queryResults.push(postgresResults[x]['productname']);
        x++;
      }
    }
     for( var x = 0; x < 1; x++ ) {
      var postgresResults = await Postgres.query(`EXPLAIN ANALYZE SELECT * FROM searchitems WHERE productname ILIKE $1 LIMIT 10`, [search]).then(data=> {return data.rows})
      speedResults.push(Number(postgresResults[postgresResults.length-1]['QUERY PLAN'].slice(16,postgresResults[5]['QUERY PLAN'].length-3)));
      // speedResults.push(postgresResults)
    }
    // ['Execution Time'].slice(0, postgresResults[5]['QUERY PLAN']['Execution Time']-3)
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    console.log('Average speed of Postgres Query in ms: ',(speedResults.reduce(reducer, 0)/x).toFixed(2));
    console.log('Query results for postgres: ',queryResults)
  }) 
  
})

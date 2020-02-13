var searchModel = require('./index.js');
var sampleSearch = require('../sampledata/data.json');
var mongoose = require('mongoose');

var searchModel = require('./index.js');
var sampleSearch = require('../sampledata/data.json');
var mongoose = require('mongoose');
const faker = require('faker');
const Drain = require('drain');
const fs = require('fs');


var writeProducts = fs.createWriteStream('products.csv');
writeProducts.write('id,productname\n', 'utf8');

var start = Date.now();
function writeTenMillion(writer, encoding, callback) {
  let i = 10000000;
  let id = 0;

  function write() {
    let ok = true;

    do {
      i -= 1;
      id += 1;
      const username = faker.commerce.productName();
      const data = `${id},${username}\n`;
      if (i === 0) {
        writer.write(data, encoding, callback);

      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);

    if (i > 0) {
    // had to stop early!
    // write some more once it drains
      writer.once('drain', write);
    }
  }

  write();
}

writeTenMillion(writeProducts, 'utf-8', () => {
  writeProducts.end();
  console.log(Date.now()-start);
});






// searchModel.remove({}, (err) => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log('\u001b[1;35mCollection items removed\u001B[37m');
//   }
// })
// .then(val => {
//   searchModel.create(sampleSearch)
//     .then(() => {
//       console.log("\u001b[1;35mDB Seeded\u001B[37m");
//       mongoose.connection.close();
//     });
// })

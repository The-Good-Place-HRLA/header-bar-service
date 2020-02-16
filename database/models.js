const models = require('./index');

module.exports = {
  getAll: (item) => {
    // return models.find().sort({id: 1});
    return models.find({id:1}).limit(1)
  },
  addItems: (items) => {
    return models.create(items);
  },
  getProductByMatch: (item) => {
    return models.find(item).limit(10).explain("executionStats")
  },
  // getProductByMatch:(item, callback) => {
  //   models.find(item, {limit: 10}, function(err, result){
  //     if(err) {
  //       callback(err)
  //     } else {
  //       callback(null, result)
  //     }
  //   })
  // }
  // getOne: (item) => {
  //   return models.find(item).limit(1)
  // }

};
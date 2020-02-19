// const model = require('../database/models.js');
const queries = require('../database/queries.js');

module.exports = {
  // getAll: (req, res) => {
  //   model.getAll()
  //     .then(allItems => {
  //       res.status(200).send(allItems);
  //     })
  //     .catch(err => res.status(200).send(err));
  // },
  getProductByMatchMG: (req, res) => {
    let regexString = '';

    // this loop builds a regEx expression that ignores whitespace between all characters
    // \s* is a regex term that ignores whitespace, use a \\ to escape the second slash because strings
    for (var i = 0; i < req.body.term.length; i++) {
      regexString += '\\s*' + req.body.term[i];
    }
    // add a regex value for spaces after as well
    regexString += '\\s*';
    var re = new RegExp(regexString); 
    
    var item =  {productname: {$regex: re, $options: 'i'}}
    // {id: {$gt:000000},
    model.getProductByMatch(item)
    .then(matchingItems => {
      res.status(200).send(matchingItems)
    })
    .catch(err => {res.status(400).send(err)})
  },
  // getProductByMatchMG: (req, res) => {
  //   var re = new RegExp(req.body.term); 
  //   var item = {productname: {$regex: re, $options: 'i'}}
  //   model.getProductByMatch(item, (err, result) => {
  //     if(err) {
  //       res.status(400).send(err)
  //     } else {
  //       res.status(200).send(result);
  //     }
  //   })
  // },
  getProductById: (req, res) => {
    let id = parseInt(req.params.id);
    queries.getProductById(id, (err, result) => {
      if(err) {
        res.status(400).send(err);
      } else {
        res.status(200).send(result)
      }
    })
  },
  getProductByMatchPG: (req, res) => {
    let term = req.body;
    queries.getProductbyMatch(term, (err, result) => {
      if(err) {
        res.status(400).send(err)
      } else {
        res.status(200).send(result);
      }
    })
  }
};
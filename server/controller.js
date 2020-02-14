const model = require('../database/models.js');
const queries = require('../database/queries.js');

module.exports = {
  getAll: (req, res) => {
    model.getAll()
      .then(allItems => {
        res.status(200).send(allItems);
      })
      .catch(err => res.status(200).send(err));
  },
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
  getProductByMatch: (req, res) => {
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
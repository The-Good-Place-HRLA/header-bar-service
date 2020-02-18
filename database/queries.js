
const db = require('./postgres.js')
// const Pool = require("pg").Pool;
// const pool = new Pool({
//   host: "edgarbarrientos",
//   database: "rei",
//   port: 3005
// });
const queries = {
    getProductById: (id, callback) => {
        db.query(`SELECT * FROM searchitems WHERE id = $1`, [id], (err, rows) => {
            if(err) {
                callback(err);
            } else {
                callback(null,rows.rows)
            }
        })
    },
    getProductbyMatch: (term, callback) => {
    
        var search = `%${term.term}%`;
        db.query(`SELECT * FROM searchitems WHERE productname LIKE $1 LIMIT 10`, [search],(err, rows) => {
            if(err) {
                callback(err)
            } else {
                callback(null, rows.rows)
            }
        })
    }
}
// const queries = {
//     getProducts: (req, res) => {
//         db.query("SELECT * FROM searchitems", (error, results) => {
//           if (error) {
//               res.status(400).send(error)
//           }
//           res.status(200).send(results.rows);
//         });
//       },
//       getProductById: (req, res) => {
//           let id = parseInt(req.params.id);
//           db.query("SELECT * FROM searchitems WHERE id = $1", [id], (error, results) => {
//               if(error) {
//                   res.status(400).send(error)
//               }
//               res.status(200).send(result.rows)
//           })
//       },
//       postProduct: (req, res) => {
//           const {id, name} = req.body;
//           db.query("INSERT INTO searchitems (id, name) VALUES ($1, $2)",[id, name], (error, result) => {
//               if(error) {
//                   res.status(400).send(error)
//               }
//               res.status(200).send(result.rows);
//           })
//       },
//       updateProduct: (req, res) => {
//           const id = req.params.id;
//           const {name} = req.body;
//           db.query("UPDATE searchitem SET name = $1 WHERE id = $2", [id, name], (error, result) => {
//               if(error) {
//                   res.status(400).send(error)
//               }
//               res.status(200).send(`product modified with ID: ${id}`)
//           })
//       },
//       deleteProduct: (req, res) => {
//           const id = req.params.id;
//           db.query("DELETE FROM searchitem WHERE id = $1", [id], (error, result) => {
//               if(error) {
//                   res.status(400).send(error);
//               }
//               res.status(200).send(`Deleted product with id: ${id}`)
//           })
//       }
// }
module.exports = queries;





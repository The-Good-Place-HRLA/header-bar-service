const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.getAll)
  .post(controller.getProductByMatchMG)
  // .post(controller.getProductByMatchPG)
  
router
.route('/:id')
.get(controller.getProductById)

module.exports = router;
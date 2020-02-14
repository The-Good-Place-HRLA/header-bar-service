const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/')
  .get(controller.getAll)
  .post(controller.getProductByMatch)
  
router
.route('/:id')
.get(controller.getProductById)

module.exports = router;
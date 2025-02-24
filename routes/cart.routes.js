const express = require('express');
const cartController = require('../controller/cart.controller');
const cartMiddleware = require('../middleware/cart.middleware');

const router = express.Router();

router.post('/', cartController.addToCart);

router
  .route('/:id')
  .patch(cartMiddleware.cartExist, cartController.updateCart)
  .delete(cartMiddleware.cartExist, cartController.deleteCart);

module.exports = router;

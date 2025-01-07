const express = require('express');

const createController = require('../controller/orders.controller');

const protectMiddleware = require('../middleware/user.middleware');
const validMiddleware = require('../middleware/validationts.middleware');
const ordersMiddleware = require('../middleware/orders.middleware');

const router = express.Router();

router.use(protectMiddleware.protect);

router.post('/', validMiddleware.validOrders, createController.createOrders);
router.get('/me', createController.findAllOrders);
router
  .route('/:id')
  .patch(
    ordersMiddleware.orderExist,
    protectMiddleware.protectAccountOwner,
    createController.updateOrders
  )
  .delete(
    ordersMiddleware.orderExist,
    protectMiddleware.protectAccountOwner,
    createController.deleteOrders
  );

module.exports = router;

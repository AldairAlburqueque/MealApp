const express = require('express');

const userController = require('../controller/user.controller');

const validationMiddleware = require('../middleware/validationts.middleware');
const userMiddleware = require('../middleware/user.middleware');
const ordersMiddleware = require('../middleware/orders.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  userController.signup
);

router.post(
  '/login',
  validationMiddleware.updateUserValidation,
  userController.login
);

router.use(userMiddleware.protect);

router
  .route('/:id')
  .patch(
    userMiddleware.validIfExistUser,
    userMiddleware.protectAccountOwner,
    userController.updateUser
  )

  .delete(
    userMiddleware.validIfExistUser,
    userMiddleware.protectAccountOwner,
    userController.delete
  );

router.get('/orders', userController.ordersAllUser);
router.get(
  '/orders/:id',
  ordersMiddleware.orderExist,
  userController.orderUser
);

module.exports = router;

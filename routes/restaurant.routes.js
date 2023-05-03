const express = require('express');

const restaurantController = require('../controller/restaurant.controller');

const validMiddleware = require('../middleware/validationts.middleware');
const userMiddleware = require('../middleware/user.middleware');
const restaurantMiddleware = require('../middleware/restaurant.middleware');
const reviewMiddleware = require('../middleware/review.middleware');

const router = express.Router();

router.get('/', restaurantController.findAllRestaurant);

router.get(
  '/:id',
  restaurantMiddleware.validRestaurant,
  restaurantController.findOneRestaurant
);

router.use(userMiddleware.protect);

router
  .route('/')
  .post(
    validMiddleware.validCreateRestaurant,
    userMiddleware.restrictTo('admin'),
    restaurantController.createRestaurant
  );

router
  .route('/:id')
  .patch(
    restaurantMiddleware.validRestaurant,
    userMiddleware.restrictTo('admin'),
    restaurantController.updateRestaurant
  )
  .delete(
    restaurantMiddleware.validRestaurant,
    userMiddleware.restrictTo('admin'),
    restaurantController.deleteRestaurent
  );

router.post(
  '/reviews/:id',
  validMiddleware.validExistReview,
  restaurantMiddleware.validRestaurant,
  restaurantController.createReviewsRestaurant
);

router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validMiddleware.validExistReview,
    restaurantMiddleware.validRestaurant,
    reviewMiddleware.validReview,
    userMiddleware.protectAccountOwner,
    restaurantController.updateReviewsRestaurant
  )
  .delete(
    reviewMiddleware.validReview,
    restaurantMiddleware.validRestaurant,
    userMiddleware.protectAccountOwner,
    restaurantController.deleteReviewsRestaurant
  );

module.exports = router;

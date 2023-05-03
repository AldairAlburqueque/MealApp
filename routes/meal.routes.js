const express = require('express');

const mealsController = require('../controller/meals.controller');

const userMiddleware = require('../middleware/user.middleware');
const validMeals = require('../middleware/validationts.middleware');
const mealMiddleware = require('../middleware/meals.middleware');
const restaurantMiddleware = require('../middleware/restaurant.middleware');

const router = express.Router();

router.get('/', mealsController.findAllMeals);

router.get('/:id', mealMiddleware.mealsExist, mealsController.findOneMealsById);

router.use(userMiddleware.protect);

router
  .route('/:id')
  .post(
    validMeals.validCreateMeals,
    restaurantMiddleware.validRestaurant,
    userMiddleware.restrictTo('admin'),
    mealsController.createMeals
  )

  .patch(
    mealMiddleware.mealsExist,
    userMiddleware.restrictTo('admin'),
    mealsController.updateMeals
  )
  .delete(
    mealMiddleware.mealsExist,
    userMiddleware.restrictTo('admin'),
    mealsController.deleteMeals
  );

module.exports = router;

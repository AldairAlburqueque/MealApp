const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.mealsExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meals = await Meals.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Restaurants,
      },
    ],
  });

  if (!meals) {
    return next(new AppError(`Meals with id: ${id} not found`, 404));
  }

  req.meals = meals;
  next();
});

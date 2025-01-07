const Restaurants = require('../models/restaurants.model');
const Reviews = require('../models/reviews.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRestaurant = catchAsync(async (req, res, next) => {
  const { restaurantId, id } = req.params;

  const restaurant = await Restaurants.findOne({
    where: {
      id: restaurantId || id,
      status: 'active',
    },
    include: [
      {
        model: Reviews,
      },
    ],
  });

  if (!restaurant) {
    return next(new AppError('The restaurant not found', 404));
  }

  req.restaurant = restaurant;

  next();
});

const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { restaurant } = req;

  const meal = await Meals.create({
    name,
    price,
    restaurantId: restaurant.id,
  });

  res.status(201).json({
    status: 'success',
    message: 'The meals has been created',
    meal,
  });
});

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: 'active',
    },
    include: [
      {
        model: Restaurants,
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    meals,
  });
});

exports.findOneMealsById = catchAsync(async (req, res, next) => {
  const { meals } = req;

  res.status(200).json({
    status: 'success',
    message: 'Su comida por id',
    meals,
  });
});

exports.updateMeals = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meals } = req;

  await meals.update({
    name,
    price,
  });

  res.status(200).json({
    status: 'success',
    message: 'The meals has been update',
    meals,
  });
});

exports.deleteMeals = catchAsync(async (req, res, next) => {
  const { meals } = req;

  await meals.update({
    status: 'disabled',
  });

  return res.status(200).json({
    status: 'succes',
    message: 'The meals has been deleted',
    meals,
  });
});

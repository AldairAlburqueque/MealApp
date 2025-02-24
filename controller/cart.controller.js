const { MEDIUMINT } = require('sequelize');
const Cart = require('../models/cart.model');
const Meals = require('../models/meals.model');
const catchAsync = require('../utils/catchAsync');

exports.addToCart = catchAsync(async (req, res, next) => {
  const { quantity, userId, mealId } = req.body;

  const meal = await Meals.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal  not found`, 404));
  }

  const cart = await Cart.create({
    quantity,
    userId,
    mealId,
    totalPrice: quantity * meal.price,
  });

  res.status(201).json({
    status: 'success',
    message: 'Meals haas been add to cart',
    cart,
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { cart } = req;

  await cart.update({
    quantity,
    totalPrice: quantity * cart.meal.price,
  });

  res.status(200).json({
    status: 'success',
    message: 'The cart has been update!',
    cart,
  });
});

exports.deleteCart = catchAsync(async (req, res, next) => {
  const { cart } = req;

  await cart.destroy();

  res.status(200).json({
    status: 'success',
    message: 'The item has been removed from the cart!',
  });
});

const Cart = require('../models/cart.model');
const Meals = require('../models/meals.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.cartExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOne({
    where: {
      id,
    },
    include: [
      {
        model: User,
      },
      {
        model: Meals,
      },
    ],
  });

  if (!cart) {
    return next(new AppError(`Cart with id: ${id} not found`, 404));
  }

  req.cart = cart;
  next();
});

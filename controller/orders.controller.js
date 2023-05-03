const Meals = require('../models/meals.model');
const Orders = require('../models/orders.model');
const Restaurants = require('../models/restaurants.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.createOrders = catchAsync(async (req, res, next) => {
  const { quantity, mealId } = req.body;
  const { sessionUser } = req;

  const meal = await Meals.findOne({
    where: {
      id: mealId,
      status: 'active',
    },
  });

  if (!meal) {
    return next(new AppError(`Meal  not found`, 404));
  }

  const order = await Orders.create({
    quantity,
    mealId,
    userId: sessionUser.id,
    totalPrice: quantity * meal.price,
  });

  res.status(201).json({
    status: 'success',
    message: 'The order has been created',
    order,
  });
});

exports.findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const userOne = await Orders.findAll({
    attributes: {
      exclude: ['mealiId', 'totalPrice', 'quantity', 'status'],
    },

    where: {
      status: 'active',
      // id: sessionUser.id,
    },
    include: [
      {
        model: Meals,
        include: [
          {
            model: Restaurants,
            attributes: {
              exclude: ['status', 'rating', 'id'],
            },
          },
        ],
        attributes: {
          exclude: ['price', 'status', 'restaurantId', 'id'],
        },
      },
    ],
  });

  // const userOne = await Meals.findAll({
  //   where: {
  //     status: 'active',
  //   },
  //   include: [
  //     {
  //       model: Restaurants,
  //     },
  //   ],
  // });

  res.status(200).json({
    status: 'success',
    message: 'Aqui tiene su pedido que ordenó',
    userOne,
  });
});

exports.updateOrders = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({
    status: 'completed',
  });

  res.status(200).json({
    status: 'success',
    message: 'La order ha sido actualizada',
  });
});

exports.deleteOrders = catchAsync(async (req, res, next) => {
  const { orders } = req;

  await orders.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
    message: 'La order ha sido eliminado',
  });
});

const User = require('../models/users.model');

const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const AppError = require('../utils/appError');
const Orders = require('../models/orders.model');
const Meals = require('../models/meals.model');
const Restaurants = require('../models/restaurants.model');
const Reviews = require('../models/reviews.model');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(11);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    message: 'The user has been created succesfully',
    token,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('The user could not be found', 404));
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been  updated successfully',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(200).json({
    status: 'success',
    message: 'The user has been deleted',
  });
});

exports.ordersAllUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const users = await User.findAll({
    attributes: {
      exclude: ['password', 'status', 'email', 'role', 'id'],
    },
    where: {
      id: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        model: Orders,
        include: [
          {
            model: Meals,
            exclude: ['status'],
            include: [
              {
                model: Restaurants,
                attributes: {
                  exclude: ['id', 'status'],
                },
              },
            ],
          },
        ],
        attributes: {
          exclude: ['mealId', 'totalPrice', 'status'],
        },
      },
    ],
  });

  res.status(200).json({
    status: 'success',
    message: 'Todas sus orders',
    users,
  });
});

exports.orderUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { orders } = req;

  const userOne = await User.findOne({
    attributes: {
      exclude: ['password', 'status'],
    },
    where: {
      id: sessionUser.id,
      status: 'active',
    },
    include: [
      {
        where: {
          id: orders.id,
        },
        model: Orders,
        include: [
          {
            model: Meals,
            exclude: ['status'],
            include: [
              {
                model: Restaurants,
              },
            ],
          },
        ],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Order dado por un id',
    userOne,
  });
});

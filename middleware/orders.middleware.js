const Orders = require('../models/orders.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/users.model');

exports.orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const orders = await Orders.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!orders) {
    return next(new AppError(`Order with id: ${id} not found`, 404));
  }

  req.orders = orders;
  req.user = orders.user;
  next();
});

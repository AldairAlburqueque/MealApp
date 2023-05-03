const Reviews = require('../models/reviews.model');
const User = require('../models/users.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const review = await Reviews.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: User,
        attributes: {
          exclude: ['email', 'password', 'role', 'status'],
        },
      },
    ],
  });

  if (!review) {
    return next(new AppError('The review not found', 404));
  }

  req.review = review;
  req.user = review.user;
  next();
});

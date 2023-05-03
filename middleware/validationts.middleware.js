const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  validFields,
];

exports.updateUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  validFields,
];

exports.validCreateRestaurant = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Address cannot be empty'),
  body('rating')
    .notEmpty()
    .withMessage('Rating cannot be empty')
    .isLength({ min: 1, max: 5 })
    .withMessage('Rating only accepts numbers from 1 to 5'),
  validFields,
];

exports.validCreateMeals = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('price').notEmpty().withMessage('Price cannot be empty'),
  validFields,
];

exports.createReview = [
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty'),
  validFields,
];

exports.updateReview = [
  body('comment').notEmpty().withMessage('Comment cannot be empty'),
  body('rating').notEmpty().withMessage('Rating cannot be empty'),
  validFields,
];

exports.validOrders = [
  body('quantity').notEmpty().withMessage('Quantity cannot be empty'),
  body('mealId').notEmpty().withMessage('MealdId cannot be empty'),
  validFields,
];

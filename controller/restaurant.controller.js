// const { json } = require('sequelize');
const Restaurants = require('../models/restaurants.model');
const Reviews = require('../models/reviews.model');
const User = require('../models/users.model');

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurants.create({
    name,
    address,
    rating,
  });

  res.status(200).json({
    status: 'success',
    message: 'The restaurat has been created succesfully!',
    restaurant,
  });
});

exports.findAllRestaurant = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurants.findAll({
    where: {
      status: 'active',
    },
  });

  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

exports.findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(200).json({
    status: 'success',
    message: 'Hola, has seleccionado un restaurante',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const { name, address } = req.body;
  const { restaurant } = req;

  await restaurant.update({
    name,
    address,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Tu restaurante ha sido actualizado',
  });
});

exports.deleteRestaurent = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  await restaurant.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'The restaurant has been delete',
  });
});

exports.createReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { sessionUser } = req;
  const { restaurant } = req;

  const review = await Reviews.create({
    comment,
    rating,
    userId: sessionUser.id,
    restaurantId: restaurant.id,
  });

  // Obtener todas las reseñas activas del restaurante
  const activeReviews = await Reviews.findAll({
    where: {
      restaurantId: restaurant.id,
      status: 'active',
    },
  });
  console.log(activeReviews);
  // Calcular el promedio del rating
  const totalRatings = activeReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const averageRating = totalRatings / activeReviews.length;

  const roundedRating = Math.floor(averageRating); // Redondear a un entero

  // Actualizar el restaurante con el nuevo promedio
  await restaurant.update({ rating: roundedRating });

  res.status(200).json({
    status: 'success',
    message: 'La reseña nueva ha sido creada',
    review,
  });
});

exports.updateReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
  const { review } = req;
  const { restaurant } = req;

  await review.update({
    comment,
    rating,
  });

  // Obtener todas las reseñas activas del restaurante
  const activeReviews = await Reviews.findAll({
    where: {
      restaurantId: restaurant.id,
      status: 'active',
    },
  });

  // Calcular el promedio del rating
  const totalRatings = activeReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const averageRating = totalRatings / activeReviews.length;

  const roundedRating = Math.floor(averageRating); // Redondear a un entero

  //Actualizar el restaurante con el nuevo promedio
  await restaurant.update({ rating: roundedRating });

  res.status(200).json({
    status: 'success',
    message: 'La review  ha sido actualizada exitosamente',
    review,
  });
});

exports.deleteReviewsRestaurant = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({
    status: 'delete',
  });

  res.status(200).json({
    status: 'success',
    message: 'La review  ha sido eliminada exitosamente',
  });
});

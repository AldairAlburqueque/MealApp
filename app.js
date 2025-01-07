const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./src/utils/appError');
const globalErrorHandler = require('./src/controller/error.controller');

const userRouter = require('./src/routes/user.routes');

const mealRouter = require('./src/routes/meal.routes');
const orderRouter = require('./src/routes/order.routes');
const restaurantRouter = require('./src/routes/restaurant.routes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/meals', mealRouter);
app.use('/api/v1/orders', orderRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;

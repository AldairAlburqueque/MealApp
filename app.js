const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/error.controller');

const userRouter = require('./routes/user.routes');
const mealRouter = require('./routes/meal.routes');
const orderRouter = require('./routes/order.routes');
const restaurantRouter = require('./routes/restaurant.routes');

const cartRouter = require('./routes/cart.routes');

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
//nuevas rutas
app.use('/api/v1/cart', cartRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;

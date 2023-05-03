const User = require('./users.model');
const Meals = require('./meals.model');
const Orders = require('./orders.model');
const Restaurants = require('./restaurants.model');
const Reviews = require('./reviews.model');

const initModel = () => {
  // 1 User <--->M Orders
  User.hasMany(Orders, {
    foreignKey: 'userId',
  });
  Orders.belongsTo(User, { foreignKey: 'userId' });

  // 1 User <---->M Reviews
  User.hasMany(Reviews);
  Reviews.belongsTo(User);

  // 1 Restaurant <--->M Reviews
  Restaurants.hasMany(Reviews);
  Reviews.belongsTo(Restaurants);

  // 1 Restaurant <---->M Meals
  Restaurants.hasMany(Meals);
  Meals.belongsTo(Restaurants);

  // 1 Meals <-----> 1 Orders
  Meals.hasOne(Orders);
  Orders.belongsTo(Meals);
};

module.exports = initModel;

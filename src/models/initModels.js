const User = require('./users.model');
const Meals = require('./meals.model');
const Orders = require('./orders.model');
const Restaurants = require('./restaurants.model');
const Reviews = require('./reviews.model');

const initModel = () => {
  // 1 User <--->M Orders
  User.hasMany(Orders, { foreignKey: 'userId' });
  Orders.belongsTo(User, { foreignKey: 'userId' });
  // 1 User <---->M Reviews
  User.hasMany(Reviews, { foreignKey: 'userId' });
  Reviews.belongsTo(User, { foreignKey: 'userId' });
  // 1 Restaurant <--->M Reviews
  Restaurants.hasMany(Reviews, { foreignKey: 'restaurantId' });
  Reviews.belongsTo(Restaurants, { foreignKey: 'restaurantId' });
  // 1 Restaurant <---->M Meals
  Restaurants.hasMany(Meals, { foreignKey: 'restaurantId' });
  Meals.belongsTo(Restaurants, { foreignKey: 'restaurantId' });
  // 1 Meals <-----> 1 Orders
  Meals.hasOne(Orders, { foreignKey: 'mealId' });
  Orders.belongsTo(Meals, { foreignKey: 'mealId' });
};
module.exports = initModel;

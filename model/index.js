const users = require("./users");
const cart = require("./cart");

users.hasMany(cart, { foreignKey: "user_id", as: "cart" });
cart.belongsTo(users, { foreignKey: "user_id", as: "customers_detail" });

module.exports = {
  users,
  cart,
};

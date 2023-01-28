const User = require("../models/users");
const UserDetails = require("../models/usersdetails");
const Addresses = require("../models/addresses");
const Product = require("../models/products");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Category = require("../models/category");
const Stock = require("../models/stock");

User.hasOne(UserDetails, {
  onDelete: "CASCADE",
});
UserDetails.belongsTo(User, {
  onDelete: "CASCADE",
});

// ADDRESSES
User.hasMany(Addresses, {
  onDelete: "CASCADE",
});
Addresses.belongsTo(User, {
  onDelete: "CASCADE",
});

// CART
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);
CartItem.belongsTo(Product);
CartItem.belongsTo(Stock);

// ORDER 
Order.belongsTo(User, {
  foreignKey: "userId",
});
Order.hasMany(OrderItem, {});
User.hasMany(Order, {
  foreignKey: "userId",
});
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Product);
OrderItem.belongsTo(Stock);

// CATEGORIES
Product.belongsToMany(Category, { through: "Product_Category" });
Category.belongsToMany(Product, { through: "Product_Category" });

// STOCK
Product.hasMany(Stock);
Stock.belongsTo(Product);

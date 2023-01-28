const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Cart = sequelize.define("Cart", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
});

module.exports = Cart;

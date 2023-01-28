const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Products = sequelize.define(
  "Products",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING(45),
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    // stock: DataTypes.INTEGER(255),
    image: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      // allowNull: false,
    },
    offSale: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    marked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updateAt",
    paranoid: true,
    deletedAt: "destroyAt",
  }
);

module.exports = Products;

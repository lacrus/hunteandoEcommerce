const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Stock = sequelize.define(
  "Stock",
  {
    size: {
      type: DataTypes.ENUM,
      values: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "XXL",
        "XXXL",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "Medidas",
      ],
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updateAt",
  }
);

module.exports = Stock;

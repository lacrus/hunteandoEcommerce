const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const Categorys = sequelize.define("Category", {
  name: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
});

module.exports = Categorys;

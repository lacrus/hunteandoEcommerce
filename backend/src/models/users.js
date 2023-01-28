const { DataTypes } = require("sequelize");
const sequelize = require("../loaders/sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    password: DataTypes.STRING(61),
    role: {
      type: DataTypes.ENUM,
      values: ["user", "admin", "superAdmin"],
      defaultValue: "user",
      allowNull: false,
    },
    createdIn: {
      type: DataTypes.ENUM,
      values: ["local", "google"],
      defaultValue: "local",
      allowNull: false,
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

module.exports = User;

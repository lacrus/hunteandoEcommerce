const { Sequelize } = require("sequelize");
const config = require("../../config/environment");

const sequelize =
  config.nodeEnv === "production"
    ? new Sequelize(`${config.dataBase.link}`, {
        logging: false,
        native: false,
      })
    : new Sequelize(
        config.dataBase.name,
        config.dataBase.username,
        config.dataBase.password,
        {
          host: config.dataBase.host,
          dialect: config.dataBase.dialect,
          logging: false,
        }
      );

module.exports = sequelize;

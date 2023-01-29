const { Sequelize } = require("sequelize");
const config = require("../../config/environment");

const sequelize =
  // config.nodeEnv === "development"
  //   ?
  new Sequelize(
    config.dataBase.name,
    config.dataBase.username,
    config.dataBase.password,
    {
      host: config.dataBase.host,
      dialect: config.dataBase.dialect,
      logging: false,
    }
  );
// : new Sequelize(
//     `postgresql://${config.dataBase.username}:${config.dataBase.password}@${config.dataBase.host}:${config.dataBase.port}/${config.dataBase.name}`,
//     {
//       logging: false,
//       native: false,
//     }
//   );
module.exports = sequelize;

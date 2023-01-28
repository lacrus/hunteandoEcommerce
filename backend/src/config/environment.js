const dotenv = require("dotenv");

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  pathFront: process.env.PATH_FRONT,
  pathBack: process.env.PATH_BACK,
  jwtSecret: process.env.JWT_SECRET,
  dataBase: {
    name: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  },
  mercadoPago: {
    mercadoPagoToken: process.env.ACCESS_TOKEN_MP,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  nodemailer: {
    nodemailerContrasena: process.env.NODEMAILER_CONTRASENA,
    nodemailerUsuario: process.env.NODEMAILER_USUARIO,
  },
  mailAdmin: process.env.MAIL_ADMIN,
};

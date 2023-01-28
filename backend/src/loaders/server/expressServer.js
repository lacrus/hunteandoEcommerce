const express = require("express");
const config = require("../../config/environment");
const sequelize = require("../sequelize");
const cors = require("cors");
const userRouter = require("../../routes/dashboard/user");
const authRouter = require("../../routes/auth");
const productRouter = require("../../routes/dashboard/product");
const paymentRouter = require("../../routes/payment");
const cartRouter = require("../../routes/cart");
const shopRouter = require("../../routes/shop");
const contactRouter = require("../../routes/contact");

// SEMILLADO DB
const { creacionUsuarioSuperAdmin, creacionProductos } = require("./semillado");
const categoryRouter = require("../../routes/dashboard/category");

require("../../libs/relations");

class ExpressServer {
  constructor() {
    this.app = express();
    this.port = config.port;
    this.dbConnect();
  }

  async dbConnect() {
    try {
      await sequelize.sync({ force: false });
      console.log("Connection has been established successfully.");
      console.log("config", config);
      // SEMILLADO DB
      await creacionUsuarioSuperAdmin();
      // await creacionProductos();
    } catch (error) {
      console.log("config en error", config);
      console.error("Unable to connect to the database:", error);
    }
  }

  routes() {
    this.app.use(express.urlencoded());
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: [`${config.pathFront}`], //URL DEL FRONT!!
        credentials: true,
        methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
      })
    );

    this.app.use("/auth", authRouter);
    this.app.use("/cart", cartRouter);
    this.app.use("/shop", shopRouter);
    this.app.use("/contacto", contactRouter);
    this.app.use("/finalizarcompra", paymentRouter);
    this.app.use("/dashboard/admin/producto", productRouter);
    this.app.use("/dashboard/admin/users", userRouter);
    this.app.use("/dashboard/admin/categories", categoryRouter);
  }
  async start() {
    this.app.listen(this.port, (error) => {
      if (error) {
        console.error(err);
        process.exit(1);
      }
    });
  }
}

module.exports = ExpressServer;

const express = require("express");
const axios = require("axios");
const paymentRouter = express.Router();

const { verificarPermisoUsuario } = require("../middlewares/authMiddleware");
const {
  convertirCarritoEnOrden,
  guardarLinkPago,
} = require("../controllers/cart");
const { respuestaPago } = require("../Services/email");

const PaymentController = require("../controllers/payment.js");
const PaymentService = require("../Services/payment.js");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Products = require("../models/products");
const Stock = require("../models/stock");

const PaymentInstance = new PaymentController(new PaymentService());

const { ACCESS_TOKEN_MP } = process.env;

paymentRouter.post("/mercadopago/respuesta", async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("req.body.action: ", req.body.action);
  async function cambiarEstadoPagoOrden(body) {
    const infoPago = await axios.get(
      "https://api.mercadopago.com/v1/payments/" + body.data.id,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
        },
      }
    );
    let estado = "";
    if (infoPago.data.status === "approved") {
      estado = "paid";
    } else if (infoPago.data.status === "pending") {
      estado = "pending";
    } else {
      estado = "cancel";
    }
    if (estado === "paid" || estado === "cancel") {
      if (estado === "cancel") {
        const orden = await Order.findOne({
          where: { id: parseInt(infoPago.data.external_reference) },
          include: {
            model: OrderItem,
            include: [{ model: Products }, { model: Stock }],
          },
        });
        if (!orden) {
          console.log("error con numero de orden");
          return res.status(400).send("Problema con el numero de orden");
        }
        if (orden.paymentStatus === "pending") {
          for (const itemOrden of orden.OrderItems) {
            await Stock.increment("quantity", {
              by: parseInt(itemOrden.quantity),
              where: { id: itemOrden.Stock.id },
            });
          }
        }
      }
      await Order.update(
        { paymentStatus: estado, paymentId: body.data.id },
        {
          where: {
            id: parseInt(infoPago.data.external_reference),
          },
        }
      );
      if (estado === "paid") {
        respuestaPago(infoPago.data.external_reference, "paid");
      } else {
        respuestaPago(infoPago.data.external_reference, "cancel");
      }
    }
  }

  if (req.body.action === "payment.created") {
    try {
      await cambiarEstadoPagoOrden(req.body);
      res.status(200).send("ok");
    } catch (error) {
      console.log("Error en payment.created", error);
      res.status(500).send("hubo un problema");
    }
  } else {
    res.status(200).send("ok");
  }
});

paymentRouter.post(
  "/mercadopago/:id",
  verificarPermisoUsuario,
  convertirCarritoEnOrden,
  (req, res, next) => {
    PaymentInstance.getPaymentLink(req.body, res, next);
  },
  guardarLinkPago
);

module.exports = paymentRouter;

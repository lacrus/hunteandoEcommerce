const nodemailer = require("nodemailer");
const { nodemailer: NODEMAILER } = require("../config/environment");
const { pathFront, mailAdmin } = require("../config/environment");
const Order = require("../models/Order");
const orderItem = require("../models/OrderItem");
const Products = require("../models/products");
const User = require("../models/users");

async function emailCambioContrasena(nombreUsuario, link) {
  try {
    let contentHTML = `
          <h3>"Hola y bienvenido de vuelta.."</h3>
          <p>Segui el siguiente link para poder cambiar la contraseña!!</p>
          <a href="${link}">${link}</a>
      `;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${NODEMAILER.nodemailerUsuario}`,
        pass: `${NODEMAILER.nodemailerContrasena}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: `"Cambia tu contraseña!" ${NODEMAILER.nodemailerUsuario}`,
      to: `${nombreUsuario}`,
      subject: "Estamos olvidadizos!!!",
      html: contentHTML,
    });
    return info;
  } catch (e) {
    console.log(e);
  }
}

async function emailContactame(formulario, link) {
  try {
    let contentHTML = `
	<h1>${formulario.nombre} acaba de enviarte un mensaje desde ${pathFront}</h1>
	<p>Puedes responderle al siguiente e-mail: ${formulario.email}</p>

	<h3>El asunto del mensaje es:</h3>
	<p>${formulario.asunto}</p>

	<h3>El mensaje dice lo siguiente</h3>
	<p>${formulario.mensaje}</p>
	`;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${NODEMAILER.nodemailerUsuario}`,
        pass: `${NODEMAILER.nodemailerContrasena}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: `"Te contactaron desde ${pathFront}" ${mailAdmin}`,
      to: `${mailAdmin}`,
      subject: `${formulario.asunto}`,
      html: contentHTML,
    });
    return info;
  } catch (e) {
    console.log(e);
  }
}

const respuestaPago = async (idOrden, status) => {
  try {
    const orden = await Order.findOne({
      where: { id: idOrden },
      include: [
        {
          model: orderItem,
          include: { model: Products },
        },
        {
          model: User,
        },
      ],
    });

    let contentHTML = `
		<h3>${
      status === "paid"
        ? "Su pago ha sido realizado con éxito"
        : "Ha habido un problema con el pago de su pedido"
    }</h3>
		<p>A continuación le mostramos los detalles:</p>
		<p>Nº de pedido: ${orden.id} - Fecha: ${orden.createdAt
      .toJSON()
      .slice(0, 10)}</p>
		<p>Importe total: $ ${orden.total}</p>
    <p>Dirección de envío: ${orden.shippingAddress}</p>

		<h3>Su compra:</h3>
		
    <table> 
      <thead>
        <tr style="text-align: center">
          <th>#</th>
          <th>Item</th>
          <th>Cantidad</th>
          <th>Precio unit</th>
       </tr>
      </thead>
      <tbody>
        ${orden.OrderItems.map((i, idx) => {
          return `<tr style="text-align: center">
              <td>${idx + 1}</td>
              <td>${i.name}</td>
              <td>${i.quantity}</td>
              <td>$ ${i.price}</td>
            </tr>`;
        })}
      </tbody>
    </table>

		<p>Gracias por su compra</p>
	`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${NODEMAILER.nodemailerUsuario}`,
        pass: `${NODEMAILER.nodemailerContrasena}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: `"MM eCommerce!" ${mailAdmin}`,
      to: `${orden.User.email}`,
      subject: `Detalle compra # ${orden.id}`,
      html: contentHTML,
    });

    console.log("Message sent", info.messageId);
  } catch (e) {
    console.log(e);
  }
};

module.exports = { emailCambioContrasena, emailContactame, respuestaPago };

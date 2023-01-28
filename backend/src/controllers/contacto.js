const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/environment");
const { emailContactame } = require("../Services/email");
const { pathFront } = require("../config/environment");

async function enviarMailContacto(req, res, next) {
  try {
    const link = `${pathFront}/tienda`;
    await emailContactame(req.body, link);
    res.status(200).send("Mail enviado con exito");
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

module.exports = {
  enviarMailContacto,
};

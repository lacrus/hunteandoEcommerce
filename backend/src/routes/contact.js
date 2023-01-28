const { enviarMailContacto } = require("../controllers/contacto");

const contactRouter = require("express").Router();

contactRouter.post("/mailcontacto", enviarMailContacto);

module.exports = contactRouter;

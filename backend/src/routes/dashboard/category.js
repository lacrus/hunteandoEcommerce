const upload = require("../../config/multer");
const {
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
} = require("../../controllers/product");
const { validateProduct } = require("../../middlewares/validators");
const { verificarPermisoAdmin } = require("../../middlewares/authMiddleware");

const categoryRouter = require("express").Router();

categoryRouter.post("/", verificarPermisoAdmin, crearCategoria);

categoryRouter.put("/", verificarPermisoAdmin, modificarCategoria);

categoryRouter.delete("/:id", verificarPermisoAdmin, eliminarCategoria);

module.exports = categoryRouter;

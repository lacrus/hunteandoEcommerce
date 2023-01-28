const {
  getRandomProducts,
  // getAllRandomProducts,
  getProductDetails,
  getFilteredProducts,
  obtenerCategorias,
  obtenerProductosRelacionadosCategoria
} = require("../controllers/shop");

const { verificarPermisoAdmin } = require("../middlewares/authMiddleware");

const shopRouter = require("express").Router();

shopRouter.get("/productdetails/:id", getProductDetails);
shopRouter.get("/random", getRandomProducts);
shopRouter.get("/relationatedcategories/:categorie/:product", obtenerProductosRelacionadosCategoria);
// shopRouter.get("/randomall", getAllRandomProducts);
shopRouter.get("/filtered/:porpag", getFilteredProducts);
shopRouter.get("/categories", obtenerCategorias);

module.exports = shopRouter;

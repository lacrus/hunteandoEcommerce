const Sequelize = require("../loaders/sequelize/index");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const Product = require("../models/products");
const Category = require("../models/category");
const Stock = require("../models/stock");
const Categorys = require("../models/category");
const Op = require("sequelize").Op;

const getRandomProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: Sequelize.literal("random()"),
      limit: 10,
      where: {
        marked: { [Op.eq]: true },
      },
      include: {
        model: Stock,
        where: {
          quantity: {
            [Op.gt]: 0,
          },
        },
      },
    });
    return res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

const getFilteredProducts = async (req, res) => {
  try {
    const { porpag } = req.params;
    const { pag, price, stock, ordenado, orden, categorias, offSale } =
      req.query;
    const categories =
      categorias?.split(",")[0] === "all" ? [] : categorias.split(",");

    const products = categories.length
      ? await Product.findAll({
          attributes: {
            exclude: ["offSale", "marked", "updateAt", "destroyAt"],
          },
          order: [[`${ordenado || "name"}`, orden || "ASC"]],
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,
            },
          },
          offset: porpag * (pag ? parseInt(pag) - 1 : 1 - 1),
          limit: porpag,
          include: [
            {
              model: Category,
              where: {
                name: categories,
              },
            },
            {
              model: Stock,
              where: {
                quantity: {
                  [Op.gt]: !stock || stock === "false" ? -1 : 0,
                },
              },
            },
          ],
        })
      : await Product.findAll({
          attributes: {
            exclude: ["offSale", "marked", "updateAt", "destroyAt"],
          },
          order: [[`${ordenado || "name"}`, orden || "ASC"]],
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,

            },
          },
          include: [
            {
              model: Stock,
              where: {
                quantity: {
                  [Op.gt]: !stock || stock === "false" ? -1 : 0,
                },
              },
            },
          ],
          offset: porpag * (pag ? parseInt(pag) - 1 : 1 - 1),
          limit: porpag,
        });

    let total = 0;

    if (!stock || stock === "false") {
      if (categories.length) {
        total = await Product.findAndCountAll({
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,
            },
          },
          include: {
            model: Category,
            where: {
              name: categories,
            },
          },
        });
      } else {
        total = await Product.findAndCountAll({
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,
            },
          },
        });
      }
    } else {
      if (categories.length) {
        total = await Product.findAndCountAll({
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,
            },
          },
          include: [
            {
              model: Category,
              where: {
                name: categories,
              },
            },
            {
              model: Stock,
              where: {
                quantity: {
                  [Op.gt]: 0,
                },
              },
            },
          ],
        });
      } else {
        total = await Product.findAndCountAll({
          where: {
            offSale: {
              [!offSale || offSale === "false" ? Op.any : Op.eq]:
                !offSale || offSale === "false" ? [false, true] : true,
            },
          },
          include: [
            {
              model: Stock,
              where: {
                quantity: {
                  [Op.gt]: 0,
                },
              },
            },
          ],
        });
      }
    }

    return res.status(200).json({
      products,
      total: total?.rows?.length || 0,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
};

async function getProductDetails(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updateAt", "destroyAt"],
      },
      include: [
        {
          model: Stock,
          attributes: {
            exclude: ["createdAt", "updateAt", "ProductId"],
          },
        },
        {
          model: Categorys,
          attributes: {
            exclude: ["createdAt", "updateAt", "ProductId"],
          },
        },
      ],
    });
    if (!product) return res.status(500).send("Id producto inexistente");
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

const obtenerCategorias = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["name", "ASC"]],
    });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

async function obtenerProductosRelacionadosCategoria(req, res) {
  const { categorie, product } = req.params;
  try {
    const products = await Product.findAll({
      order: Sequelize.literal("random()"),
      limit: 10,
      where: {
        id: {
          [Op.not]: product,
        },
      },
      include: [
        {
          model: Category,
          where: {
            id: categorie,
          },
        },
        {
          model: Stock,
          where: {
            quantity: {
              [Op.gt]: 0,
            },
          },
        },
      ],
    });
    return res.status(200).json({
      products,
    });
  } catch (error) {
    res.status(404).json({
      message: error,
    });
  }
}

module.exports = {
  getRandomProducts,
  getFilteredProducts,
  getProductDetails,
  obtenerCategorias,
  obtenerProductosRelacionadosCategoria,
};

const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");
const Products = require("../models/products");
const Category = require("../models/category");
const Op = require("sequelize").Op;
const Stock = require("../models/stock");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll({
      // include: { all: true },
      attributes: {
        exclude: ["description", "image", "createdAt", "updateAt", "destroyAt"],
      },
      order: [["id", "ASC"]],
    });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      succes: false,
      message: error,
    });
  }
};

const crearProducto = async (req, res, next) => {
  try {
    const { name, price, description, marked, offSale } = req.body;
    let imagenes = [];
    if (req.files.length) {
      for (let i = 0; i < req.files.length; i++) {
        imagenes.push(req.files[i].path);
      }
    }
    const producto = await Products.create({
      name: name.trim().toLowerCase(),
      description: description.trim(),
      price,
      image: imagenes,
      marked: marked === "Verdadero" ? true : false,
      offSale: offSale === "Verdadero" ? true : false,
    });
    let categoria = await Category.findAll({
      where: { name: req.body.categoria },
    });
    await producto.addCategory(categoria);
    // const stock = JSON.parse(req.body.stock);
    // for (let i = 0; i < stock.length; i++) {
    //   await Stock.create({
    //     size: stock[i].size,
    //     color: stock[i].color.trim().toLowerCase(),
    //     quantity: parseInt(stock[i].quantity),
    //     ProductId: producto.id,
    //   });
    // }
    for (const e of JSON.parse(req.body.stock)) {
      await Stock.create({
        size: e.size.trim(),
        color: e.color.trim().toLowerCase(),
        quantity: parseInt(e.quantity),
        ProductId: producto.id,
      });
    }

    const products = await Products.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });
    return res.status(200).json({ message: "Product created", products });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const modificarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    let imagenesNuevas = [];
    if (req.files.length) {
      for (let i = 0; i < req.files.length; i++) {
        imagenesNuevas.push(req.files[i].path);
      }
    }
    const producto = await Products.findByPk(id);
    const imagenesABorrar = req.body.imagenesABorrar?.split(",");
    let imagenesProducto = producto.image;
    if (imagenesABorrar?.length) {
      for (let i = 0; i < imagenesABorrar?.length; i++) {
        const imagenBorrar = `${imagenesABorrar[i].split("/").reverse()[1]}/${
          imagenesABorrar[i].split("/").reverse()[0].split(".")[0]
        }`;
        await cloudinary.uploader.destroy(`${imagenBorrar}`);
        imagenesProducto = imagenesProducto.filter((e) => {
          return `${e}` !== `${imagenesABorrar[i]}`;
        });
      }
    }

    const productoNuevo = {
      name: req.body.name.trim().toLowerCase(),
      price: req.body.price,
      description: req.body.description.trim().toLowerCase(),
      // stock: req.body.stock,
      image: imagenesProducto.concat(imagenesNuevas),
      marked: req.body.marked === "Verdadero" ? true : false,
      offSale: req.body.offSale === "Verdadero" ? true : false,
    };

    await Products.update(productoNuevo, {
      where: {
        id,
      },
    });

    let categoria = await Category.findAll({
      where: { name: req.body.categoria },
    });
    await producto.setCategories(categoria);

    // STOCK
    // await Stock.destroy({
    //   where: {
    //     ProductId: id,
    //   },
    // });

    for (const e of JSON.parse(req.body.stock)) {
      if (e.id) {
        await Stock.update(
          {
            size: e.size.trim(),
            color: e.color.trim().toLowerCase(),
            quantity: parseInt(e.quantity),
          },
          {
            where: {
              id: e.id,
            },
          }
        );
      } else {
        await Stock.create({
          size: e.size.trim(),
          color: e.color.trim().toLowerCase(),
          quantity: parseInt(e.quantity),
          ProductId: id,
        });
      }
    }

    const products = await Products.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });

    res.status(200).json({ mensaje: "Modified product", products });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error });
  }
};

const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Products.findByPk(id);

    deleted &&
      (await Products.destroy({
        where: {
          id,
        },
      }));

    const products = await Products.findAll({
      include: { all: true },
      order: [["id", "ASC"]],
    });

    deleted
      ? res
          .status(200)
          .json({ mensaje: "Product deleted successfully", products })
      : res
          .status(200)
          .json({ mensaje: "The product was already deleted", products });
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

const obtenerProductosEliminados = async (req, res) => {
  try {
    const eliminados = await Products.findAll({
      where: {
        destroyAt: {
          [Op.ne]: null,
        },
      },
      attributes: {
        exclude: [
          "image",
          "offSale",
          "marked",
          "createdAt",
          "updateAt",
          "destroyAt",
        ],
      },
      paranoid: false,
      order: [["id", "ASC"]],
    });
    eliminados.length
      ? res
          .status(200)
          .json({ mensaje: "Deleted product/s", products: eliminados })
      : res
          .status(200)
          .json({ mensaje: "No deleted products found", products: [] });
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

const restaurarProductoEliminado = async (req, res) => {
  try {
    const { id } = req.params;
    await Products.restore({
      where: {
        id,
      },
    });
    const products = await Products.findAll({ include: { all: true } });
    res
      .status(200)
      .json({ mensaje: "Package restored successfully", products });
  } catch (error) {
    res.status(400).send({ data: error.message });
  }
};

async function getProductDetailsDashboard(req, res) {
  const { id } = req.params;
  try {
    const product = await Products.findOne({
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
      ],
    });
    if (!product) return res.status(500).send("Id producto inexistente");
    return res.status(200).json({ product });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error });
  }
}

const crearCategoria = async (req, res) => {
  try {
    const yaExiste = await Category.findOne({
      where: { name: req.body.name?.trim().toLowerCase() },
    });
    if (yaExiste) return res.status(400).json({ error: "Categoria ya existe" });
    await Category.create({
      name: req.body.name.trim().toLowerCase(),
    });
    const categories = await Category.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const modificarCategoria = async (req, res) => {
  try {
    const yaExiste = await Category.findOne({
      where: {
        name: req.body.name?.trim().toLowerCase(),
        id: {
          [Op.not]: req.body.id,
        },
      },
    });
    if (yaExiste) return res.status(400).json({ error: "Categoria ya existe" });
    await Category.update(
      {
        name: req.body.name.trim().toLowerCase(),
      },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    const categories = await Category.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const eliminarCategoria = async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    const categories = await Category.findAll({ order: [["id", "ASC"]] });
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

module.exports = {
  getAllProducts,
  crearProducto,
  modificarProducto,
  eliminarProducto,
  obtenerProductosEliminados,
  restaurarProductoEliminado,
  getProductDetailsDashboard,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria,
};

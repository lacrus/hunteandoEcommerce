const User = require("../models/users");
const UserDetails = require("../models/usersdetails");
const Addresses = require("../models/addresses");
const Products = require("../models/products");
const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");

const { generateAuthData } = require("./auth");

// --------------- CONTROLADORES USUARIO ---------------

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      // include: {
      //   model: UserDetails,
      //   include: [{ model: Cart, include: Products }],
      // },
      attributes: {
        exclude: ["password", "createdAt", "updateAt", "destroyAt"],
      },
      order: [["id", "ASC"]],
    });
    return res.json({
      message: "succesfully",
      users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "succesfully",
    });
  }
};

const userDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "updateAt", "createdAt", "destroyAt"],
      },
      include: {
        model: UserDetails,
        attributes: {
          exclude: ["id", "UserId", "createdAt", "updatedAt"],
        },
      },
    });
    res.status(200).json({ user });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const userdetailcomplete = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password", "updateAt", "createdAt", "destroyAt"],
      },
      include: [
        {
          model: UserDetails,
          attributes: {
            exclude: ["id", "UserId", "updatedAt"],
          },
        },
        {
          model: Addresses,
          attributes: {
            exclude: ["id", "UserId", "createdAt", "updatedAt"],
          },
        },
        {
          model: Order,
          attributes: {
            exclude: ["deletedAt", "userId", "UserId"],
          },
        },
      ],
    });

    res.status(200).json({ user });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const updateRoleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.query;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) {
      user.role = role;
      await user.save();
    }
    const users = await User.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updateAt", "destroyAt"],
      },
      order: [["id", "ASC"]],
    });
    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const updateDataUser = async (req, res) => {
  try {
    const id = req.user.id;

    let user = await User.findByPk(parseInt(id), {
      attributes: {
        exclude: ["password", "updateAt", "createdAt", "destroyAt"],
      },
      include: {
        model: UserDetails,
      },
    });
    // await user.update({
    //   email: req.body.email?.trim().toLowerCase(),
    // });
    await user.UserDetail.update({
      firstname: req.body.nombre?.trim().toLowerCase(),
      lastname: req.body.apellido?.trim().toLowerCase(),
    });
    generateAuthData(res, user);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

async function getUsersSales(req, res) {
  try {
    const sales = await Order.findAll({
      attributes: {
        exclude: ["paymentLink", "updatedAt", "deletedAt"],
      },
      order: [["id", "ASC"]],
      include: {
        model: User,
        attributes: {
          exclude: [
            "id",
            "password",
            "role",
            "createdAt",
            "updateAt",
            "destroyAt",
          ],
        },
      },
    });
    return res.status(200).json({ sales });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getUserSaleDetails(req, res) {
  const { id } = req.params;
  try {
    const sale = await Order.findOne({
      where: {
        id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["paymentLink", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: OrderItem,
          attributes: {
            exclude: ["createdAt", "updateAt", "destroyAt", "OrderId"],
          },
          include: {
            model: Products,
            attributes: {
              exclude: [
                "id",
                "name",
                "price",
                "createdAt",
                "updateAt",
                "destroyAt",
              ],
            },
          },
        },
        {
          model: User,
          attributes: {
            exclude: [
              "id",
              "password",
              "role",
              "createdAt",
              "updateAt",
              "destroyAt",
              "OrderId",
            ],
          },
        },
      ],
    });
    return res.status(200).json({ sale });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function modifyUserSaleDetails(req, res) {
  const { id } = req.params;
  const { shippingStatus } = req.body;
  try {
    await Order.update({ shippingStatus }, { where: { id } });

    const sale = await Order.findOne({
      where: {
        id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["paymentLink", "updatedAt", "deletedAt"],
      },
      include: [
        {
          model: OrderItem,
          attributes: {
            exclude: ["createdAt", "updateAt", "destroyAt", "OrderId"],
          },
          include: {
            model: Products,
            attributes: {
              exclude: [
                "id",
                "name",
                "price",
                "createdAt",
                "updateAt",
                "destroyAt",
              ],
            },
          },
        },
        {
          model: User,
          attributes: {
            exclude: [
              "id",
              "password",
              "role",
              "createdAt",
              "updateAt",
              "destroyAt",
              "OrderId",
            ],
          },
        },
      ],
    });
    return res.status(200).json({ sale });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// --------------- CONTROLADORES DIRECCION ---------------

const getAddresses = async (req, res) => {
  try {
    const addresses = await Addresses.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    res.status(200).json({ addresses });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const createAddress = async (req, res) => {
  try {
    await Addresses.create({
      street: req.body.street.toLowerCase(),
      number: req.body.number,
      city: req.body.city.toLowerCase(),
      province: req.body.province,
      detail: req.body.detail.toLowerCase() || null,
      contact: req.body.contact || null,
      zipCode: req.body.zipCode,
      UserId: req.user.id,
    });

    const addresses = await Addresses.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt"],
      },
    });
    res.status(200).json({ addresses });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const modifyAddress = async (req, res) => {
  const { id, street, number, city, province, detail, contact, zipCode } =
    req.body;
  try {
    const direccion = await Addresses.findByPk(id);
    await direccion.update({
      street: street?.trim().toLowerCase(),
      number: number,
      city: city?.trim().toLowerCase(),
      province: province,
      detail: detail?.trim().toLowerCase(),
      contact: Number.isNaN(parseInt(contact)) ? null : contact,
      zipCode: zipCode?.trim().toLowerCase(),
    });
    const addresses = await Addresses.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    res.status(200).json({ addresses });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { idAddress } = req.query;
    await Addresses.destroy({
      where: { id: idAddress, UserId: req.user.id },
    });
    const addresses = await Addresses.findAll({
      where: {
        UserId: req.user.id,
      },
      attributes: {
        exclude: ["UserId", "createdAt", "updatedAt"],
      },
      order: [["id", "ASC"]],
    });
    res.status(200).json({ addresses });
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

// --------------- CONTROLADORES ORDENES ---------------

async function getOrdersUser(req, res, next) {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.user.id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt", "userID"],
      },
    });
    return res.status(200).json({ orders });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

async function getOrderDetailUser(req, res, next) {
  const { orderId: id } = req.query;
  try {
    const order = await Order.findOne({
      where: {
        id: id,
        userId: req.user.id,
      },
      order: [["id", "ASC"]],
      attributes: {
        exclude: ["paymentLink", "updatedAt", "deletedAt", "userId"],
      },
      include: {
        model: OrderItem,
        attributes: {
          exclude: ["createdAt", "updateAt", "destroyAt", "OrderId"],
        },
        include: {
          model: Products,
          attributes: {
            exclude: [
              "id",
              "name",
              "price",
              "createdAt",
              "updateAt",
              "destroyAt",
            ],
          },
        },
      },
    });
    return res.status(200).json({ order });
  } catch (error) {
    return res.status(400).json({ error });
  }
}

// --------------------------- NO SE USAN

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "User not exist",
    });
  }
};

const getUserByEmail = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      const newUser = user.toJSON();
      delete user.password;

      return res.status(200).json({
        success: true,
        user: newUser,
      });
    } else throw new Error("User not exist");
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
      },
      include: {
        model: UserDetails,
        include: [{ model: Cart, include: Products }],
      },
    });
    if (user) {
      const newUser = user.toJSON();
      delete newUser.password;
      return res.status(200).json({
        success: true,
        newUser,
      });
    } else throw new Error("User not exist");
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const dashboardUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, firstName, lastName, country, city, province } = req.body;
    const result = await User.update(password, {
      where: {
        id,
      },
    });
    //     await Image.create({ url, ProductId: id })
    const userDetails = await UserDetails.create({
      firstName,
      lastName,
      UserId: id,
    });
    // UserDetailId
    await Addresses.upd({
      country,
      city,
      province,
      UserDetailId: userDetails.id,
    });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
    });
  }
};

module.exports = {
  getAllUsers,
  userDetails,
  userdetailcomplete,
  updateRoleUser,
  updateDataUser,
  createAddress,
  getAddresses,
  modifyAddress,
  deleteAddress,
  getOrdersUser,
  getOrderDetailUser,
  getUsersSales,
  getUserSaleDetails,
  modifyUserSaleDetails,

  getUserByEmail,
  getUserById,
  getUserByUsername,
  dashboardUser,
};

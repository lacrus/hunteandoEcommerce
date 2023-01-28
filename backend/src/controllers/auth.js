const Users = require("../models/users");
const UserDetails = require("../models/usersdetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/environment");
const Cart = require("../models/cart");
const { emailCambioContrasena } = require("../Services/email");
const { pathFront } = require("../config/environment");

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usuario = await Users.findOne({
      where: { email: email.toLowerCase() },
    });

    if (usuario) return res.status(401).send("Email ya registrado");

    const user = await Users.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: await encrypt(password),
    });
    await UserDetails.create({
      UserId: user.id,
      country: "",
      city: "",
      province: "",
    });
    await Cart.create({
      UserId: user.id,
    });
    generateAuthData(res, user);
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const encrypt = async (password) => {
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const compare = async (password, hash) => {
  try {
    return bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: email.toLowerCase(),
      },
      attributes: {
        exclude: ["updateAt", "createdAt", "destroyAt"],
      },
      include: {
        model: UserDetails,
        attributes: {
          exclude: ["id", "UserId", "createdAt", "updatedAt"],
        },
      },
    });
    if (user && (await compare(password, user.toJSON().password))) {
      generateAuthData(res, user);
    } else throw new Error("Credentials incorrect");
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
const generateAuthData = (res, userData) => {
  const user = {
    id: userData.toJSON().id,
    email: userData.toJSON().email,
    username: userData.toJSON().username,
    role: userData.toJSON().role,
    firstname: userData.UserDetail?.firstname || "",
    lastname: userData.UserDetail?.lastname || "",
    createdIn: userData.toJSON().createdIn,
  };
  const token = createToken(user);
  if (res) {
    return res.status(200).json({
      success: true,
      user,
      token,
    });
  } else {
    return { user, token };
  }
};
const logout = async () => {};

const completarLogeoGoogle = async (req, res, next) => {
  const usuario = generateAuthData(false, req.user);
  res.status(200).redirect(`${pathFront}/login/google/${usuario.token}`);
};

const verificarLogueoToken = async (req, res, next) => {
  try {
    const usuarioDecodificado = await jwt.verify(req.params?.token, jwtSecret);
    const user = await Users.findOne({
      where: {
        id: usuarioDecodificado.id,
      },
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
    generateAuthData(res, user);
  } catch (error) {
    res.status(401).send("Token invalido");
  }
};

async function recuperarContrasena(req, res, next) {
  try {
    let usuario = await Users.findOne({
      where: { email: req.body.email },
    });

    if (usuario === null) {
      res.status(200).send("Hubo un error");
    } else if (usuario.createdIn !== "local") {
      res.status(400).send({ message: "Usuario no creado local" });
    } else {
      const token = await createToken(
        {
          email: usuario.email,
          id: usuario.id,
        },
        "1800s"
      );
      const link = `${pathFront}/CambiarContrasena/${token}`;
      await emailCambioContrasena(usuario.email, link);
      res.status(200).end("Mail enviado con exito");
    }
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

async function cambiarContrasena(req, res, next) {
  try {
    const usuarioDecodificado = await jwt.verify(
      req.headers.authorization,
      jwtSecret
    );
    if (req.body.password?.length >= 6) {
      const usuario = await Users.update(
        {
          password: await encrypt(req.body.password),
        },
        {
          where: { id: usuarioDecodificado.id },
        }
      );
    } else {
      return res.status(400).json({ error: "Contraseña invalida" });
    }

    const user = await Users.findOne({
      where: {
        id: usuarioDecodificado.id,
      },
      attributes: {
        exclude: ["updateAt", "createdAt", "destroyAt"],
      },
      include: {
        model: UserDetails,
        attributes: {
          exclude: ["id", "UserId", "createdAt", "updatedAt"],
        },
      },
    });
    // return res.status(200).send("Contraseña cambiada")
    generateAuthData(res, user);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

module.exports = {
  signUp,
  signIn,
  completarLogeoGoogle,
  logout,
  encrypt,
  verificarLogueoToken,
  generateAuthData,
  recuperarContrasena,
  cambiarContrasena,
};

const createToken = (data, tiempo) => {
  if (tiempo) {
    return jwt.sign(data, jwtSecret, {
      expiresIn: tiempo,
    });
  } else {
    return jwt.sign(data, jwtSecret, {
      expiresIn: "7d",
    });
  }
};

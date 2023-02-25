const { google } = require("./environment");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/users");
const UserDetails = require("../models/usersdetails");
const Cart = require("../models/cart");
const { pathBack } = require("../config/environment");

passport.use(
  new GoogleStrategy(
    {
      //configuraciones para la estrategia de google
      clientID: google.clientId,
      clientSecret: google.clientSecret,
      callbackURL: `${pathBack}/api/auth/login/google/redireccion`,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const yaExiste = await User.findOne({
          where: { email: profile._json.email },
          include: {
            model: UserDetails,
          },
        });
        if (yaExiste) {
          if (yaExiste.createdIn !== "google") {
            return cb(null, false, {
              message: "Cuenta creada localmente",
            });
          }
          return cb(null, yaExiste);
        } else {
          const user = await User.create({
            username: profile._json.email,
            email: profile._json.email,
            createdIn: "google",
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

          const usuario = await User.findOne({
            where: {
              id: user.id,
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
          return cb(null, usuario);
        }
      } catch (e) {
        return cb(e);
      }
    }
  )
);

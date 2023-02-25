const {
  signUp,
  signIn,
  completarLogeoGoogle,
  verificarLogueoToken,
  recuperarContrasena,
  cambiarContrasena,
} = require("../controllers/auth");
const passport = require("passport");
const { validateCreate, validateLogin } = require("../middlewares/validators");
const { verificarPermisoAdmin } = require("../middlewares/authMiddleware");
const { pathFront } = require("../config/environment");

const authRouter = require("express").Router();

authRouter.post(
  "/register",
  //   validateCreate,
  signUp
);
authRouter.post(
  "/login",
  // validateLogin,
  signIn
);

// LOGUEO GOOGLE
authRouter.get(
  "/login/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email", "openid"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/login/google/redireccion",
  passport.authenticate("google", {
    session: false,
    // successRedirect: `${pathFront}`,
    failureRedirect: "/auth/fallo",
  }),
  completarLogeoGoogle
);

authRouter.get("/fallo", (req, res) => {
  res.redirect(`${pathFront}/login?fallo=googleLocal`);
});

authRouter.get("/login/:token", verificarLogueoToken);
authRouter.post("/recuperarcontrasena", recuperarContrasena);
authRouter.post("/cambiarcontrasena", cambiarContrasena);

module.exports = authRouter;

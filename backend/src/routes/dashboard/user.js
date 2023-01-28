const {
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
} = require("../../controllers/user");
const {
  verificarPermisoSuperAdmin,
  verificarPermisoAdmin,
  verificarPermisoUsuario,
} = require("../../middlewares/authMiddleware");
const { validateCreate } = require("../../middlewares/validators");

const userRouter = require("express").Router();

// dashboard admin
userRouter.get("/", verificarPermisoAdmin, getAllUsers);
userRouter.get("/userdetail/:id", verificarPermisoAdmin, userDetails);
userRouter.get(
  "/userdetailcomplete/:id",
  verificarPermisoAdmin,
  userdetailcomplete
);

userRouter.get("/updaterole/:id", verificarPermisoSuperAdmin, updateRoleUser);
userRouter.get("/getuserssales", verificarPermisoAdmin, getUsersSales);
userRouter.get(
  "/getsaledetails/:id",
  verificarPermisoAdmin,
  getUserSaleDetails
);
userRouter.put(
  "/modifysaledetails/:id",
  verificarPermisoAdmin,
  modifyUserSaleDetails
);

// dashboard cliente
userRouter.get("/addresses/:id", verificarPermisoUsuario, getAddresses);
userRouter.post("/updateuser/:id", verificarPermisoUsuario, updateDataUser);
userRouter.post("/addresses/:id", verificarPermisoUsuario, createAddress);
userRouter.put("/addresses/:id", verificarPermisoUsuario, modifyAddress);
userRouter.delete("/addresses/:id", verificarPermisoUsuario, deleteAddress);
userRouter.get("/compras/:id", verificarPermisoUsuario, getOrdersUser);
userRouter.get(
  "/detallecompra/:id",
  verificarPermisoUsuario,
  getOrderDetailUser
);

module.exports = userRouter;

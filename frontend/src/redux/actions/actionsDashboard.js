import axios from "axios";

export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DELETE_PRODUCT_CART = "DELETE_PRODUCT_CART";
export const MODIFY_PRODUCT_CART = "MODIFY_PRODUCT_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DELETED_PRODUCTS = "GET_DELETED_PRODUCTS";
export const ORDER_USERS = "ORDER_USERS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const GET_USER_DETAILS = "GET_USER_DETAILS";

// ------------------ ACTIONS PRODUCTOS ------------------

export const obtenerTodosLosProductos = (queHacer, token) => {
  try {
    return async function (dispatch) {
      if (queHacer === "reset") {
        return dispatch({
          type: GET_PRODUCTS,
          payload: [],
        });
      } else {
        let res = await axios({
          method: "GET",
          // withCredentials: true,
          url: "/dashboard/admin/producto",
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({
          type: GET_PRODUCTS,
          payload: res.data.products,
        });
      }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export function obtenerProductosEliminados(token) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "dashboard/admin/producto/eliminados",
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({
        type: GET_DELETED_PRODUCTS,
        payload: res.data.products,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export function crearProducto(producto, token) {
  console.log(producto);
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        url: "/dashboard/admin/producto",
        data: producto,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      });
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export function modificarProducto(id, producto, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PUT",
        url: "/dashboard/admin/producto/" + id,
        data: producto,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `${token}`,
        },
      });
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export function eliminarProducto(idProducto, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "DELETE",
        // withCredentials: true,
        url: "/dashboard/admin/producto/" + idProducto,
        headers: { authorization: `${token}` },
      });
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

export function recuperarProductoEliminado(idProducto, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PATCH",
        url: "/dashboard/admin/producto/" + idProducto,
        headers: { authorization: `${token}` },
      });
      return dispatch({
        type: GET_PRODUCTS,
        payload: res.data.products,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
}

// ------------------ ACTIONS USUARIOS ------------------

export function obtenerUsuarios(token) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "GET",
        url: "/dashboard/admin/users",
        headers: {
          authorization: `${token}`,
        },
      });
      if (res.data.message === "succesfully") {
        return dispatch({
          type: "GET_USERS",
          payload: res.data.users,
          success: true,
        });
      } else {
        return { success: false, mensaje: "Error" };
      }
    };
  } catch (error) {
    console.log("algun error");
    throw new Error(error);
  }
}

export function modificarRolUsuario(id, rol, token) {
  try {
    return async function (dispatch) {
      const res = await axios({
        method: "GET",
        url: `/dashboard/admin/users/updaterole/${id}?role=${rol}`,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: "GET_USERS", payload: res.data.users });
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function obtenerDetallesUsuario(id, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "GET",
        url: "/dashboard/admin/users/userdetail/" + id,
        headers: {
          authorization: `${token}`,
        },
      });
      console.log(res);
      return dispatch({ type: GET_USER_DETAILS, payload: res.data.user });
    } catch (e) {
      throw new Error(e);
    }
  };
}

// ------------------ ACTIONS CARRITO ------------------

export const agregarProductoCarrito = (datosProducto) => {
  try {
    return async function (dispatch) {
      // let res = await axios({
      //   method: "POST",
      //   data: datosProducto,
      //   withCredentials: true,
      //   url: "/",
      // });
      //   if (res.data.success === true) {
      //     return dispatch({
      //       type: ADD_PRODUCT_CART,
      //       payload: datosProducto,
      //       success: true,
      //     });
      //   } else {
      //     return {
      //       success: false,
      //       mensaje: res.data.error.errors[0].message || "Error al registrar",
      //     };
      //   }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export const eliminarProductoCarrito = (datosProducto) => {
  try {
    return async function (dispatch) {
      // let res = await axios({
      //   method: "POST",
      //   data: datosProducto,
      //   withCredentials: true,
      //   url: "/",
      // });
      //   if (res.data.success === true) {
      return dispatch({
        type: DELETE_PRODUCT_CART,
        payload: datosProducto,
        idProducto: datosProducto,
        success: true,
      });
      //   } else {
      //     return {
      //       success: false,
      //       mensaje: res.data.error.errors[0].message || "Error al eliminar producto",
      //     };
      //   }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export const modificarCantidadProductoCarrito = (datosProducto) => {
  try {
    return async function (dispatch) {
      // let res = await axios({
      //   method: "POST",
      //   data: datosProducto,
      //   withCredentials: true,
      //   url: "/",
      // });
      //   if (res.data.success === true) {
      return dispatch({
        type: MODIFY_PRODUCT_CART,
        payload: datosProducto,
        success: true,
      });
      //   } else {
      //     return {
      //       success: false,
      //       mensaje: res.data.error.errors[0].message || "Error al eliminar producto",
      //     };
      //   }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export const vaciarCarrito = (datosProducto) => {
  try {
    return async function (dispatch) {
      // let res = await axios({
      //   method: "POST",
      //   data: datosProducto,
      //   withCredentials: true,
      //   url: "/",
      // });
      //   if (res.data.success === true) {
      return dispatch({
        type: DELETE_CART,
        payload: datosProducto,
        success: true,
      });
      //   } else {
      //     return {
      //       success: false,
      //       mensaje: res.data.error.errors[0].message || "Error al eliminar producto",
      //     };
      //   }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

// ------------------ ACTIONS ORDENAMIENTO ------------------

export const ordenarUsuarios = (columna) => {
  return function (dispatch) {
    return dispatch({
      type: ORDER_USERS,
      payload: columna,
    });
  };
};

export const ordenarProductos = (columna) => {
  return function (dispatch) {
    return dispatch({
      type: ORDER_PRODUCTS,
      payload: columna,
    });
  };
};

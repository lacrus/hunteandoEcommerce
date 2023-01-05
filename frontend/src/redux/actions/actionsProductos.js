import axios from "axios";

export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART";
export const DELETE_PRODUCT_CART = "DELETE_PRODUCT_CART";
export const MODIFY_PRODUCT_CART = "MODIFY_PRODUCT_CART";
export const DELETE_CART = "DELETE_CART";
export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DELETED_PRODUCTS = "GET_DELETED_PRODUCTS";

export const obtenerTodosLosProductos = (queHacer) => {
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

export function obtenerProductosEliminados() {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "GET",
        url: "dashboard/admin/producto/eliminados",
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

export function crearProducto(producto) {
  console.log(producto);
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        url: "/dashboard/admin/producto",
        data: producto,
        headers: {
          "Content-Type": "multipart/form-data",
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

export function modificarProducto(id, producto) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PUT",
        url: "/dashboard/admin/producto" + id,
        data: producto,
        headers: {
          "Content-Type": "multipart/form-data",
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

export function eliminarProducto(idProducto) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "DELETE",
        // withCredentials: true,
        url: "/dashboard/admin/producto/" + idProducto,
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

export function recuperarProductoEliminado(idProducto) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PATCH",
        url: "/dashboard/admin/producto/" + idProducto,
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

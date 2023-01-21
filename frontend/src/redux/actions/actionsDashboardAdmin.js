import axios from "axios";

import { GET_USERS } from "./actionsLogin";
import { GET_CATEGORIES, GET_PRODUCT_DETAIL } from "./actionsShop";

export const GET_PRODUCTS = "GET_PRODUCTS";
export const GET_DELETED_PRODUCTS = "GET_DELETED_PRODUCTS";
export const ORDER_USERS = "ORDER_USERS";
export const ORDER_PRODUCTS = "ORDER_PRODUCTS";
export const GET_USER_DETAILS = "GET_USER_DETAILS";
export const GET_SALES = "GET_SALES";
export const GET_SALE_DETAILS = "GET_SALE_DETAILS";

// ------------------ ACTIONS PRODUCTOS ------------------

export const obtenerTodosLosProductos = (token) => {
  try {
    return async function (dispatch) {
      if (!token) {
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

export function obtenerDetallesProductoDashboard(idProd, token) {
  return async function (dispatch) {
    if (!idProd) {
      return dispatch({
        type: GET_PRODUCT_DETAIL,
        payload: {},
      });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/dashboard/admin/producto/productdetails/" + idProd,
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({
          type: GET_PRODUCT_DETAIL,
          payload: res.data.product,
        });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

export function obtenerProductosEliminados(token) {
  return async (dispatch) => {
    if (!token) {
      return dispatch({
        type: GET_DELETED_PRODUCTS,
        payload: [],
      });
    } else {
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
    }
  };
}

export function crearProducto(producto, token) {
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
  return async function (dispatch) {
    try {
      if (!token) {
        return dispatch({
          type: GET_USERS,
          payload: [],
          success: true,
        });
      } else {
        let res = await axios({
          method: "GET",
          url: "/dashboard/admin/users",
          headers: {
            authorization: `${token}`,
          },
        });
        if (res.data.message === "succesfully") {
          return dispatch({
            type: GET_USERS,
            payload: res.data.users,
            success: true,
          });
        } else {
          return { success: false, mensaje: "Error" };
        }
      }
    } catch (error) {
      throw new Error(error);
    }
  };
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
      return dispatch({ type: GET_USERS, payload: res.data.users });
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function obtenerDetalleCompletoUuario(idUsuario, token) {
  return async function (dispatch) {
    if (!token) {
      return dispatch({ type: GET_USER_DETAILS, payload: {} });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/dashboard/admin/users/userdetailcomplete/" + idUsuario,
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({ type: GET_USER_DETAILS, payload: res.data.user });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

export function obtenerVentasUsuarios(token) {
  return async function (dispatch) {
    if (!token) {
      dispatch({ type: GET_SALES, payload: [] });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/dashboard/admin/users/getuserssales",
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({ type: GET_SALES, payload: res.data.sales });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

export function obtenerDetallesVentaUsuario(idVenta, token) {
  return async function (dispatch) {
    if (!token) {
      return dispatch({ type: GET_SALE_DETAILS, payload: {} });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/dashboard/admin/users/getsaledetails/" + idVenta,
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({ type: GET_SALE_DETAILS, payload: res.data.sale });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

export function modificarEstadoEnvio(idVenta, estadoEnvio, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PUT",
        data: estadoEnvio,
        url: "/dashboard/admin/users/modifysaledetails/" + idVenta,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_SALE_DETAILS, payload: res.data.sale });
    } catch (error) {
      return new Error(error);
    }
  };
}

// ------------------ ACTIONS CATEGORIAS ------------------

export function crearCategoria(categoria, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        url: "/dashboard/admin/categories",
        data: categoria,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function modificarCategoria(categoria, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "PUT",
        url: "/dashboard/admin/categories",
        data: categoria,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
    } catch (error) {
      throw new Error(error);
    }
  };
}

export function eliminarCategoria(idCategoria, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "DELETE",
        url: "/dashboard/admin/categories/" + idCategoria,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
    } catch (error) {
      return new Error(error);
    }
  };
}

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

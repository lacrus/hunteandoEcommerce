import axios from "axios";
import { ADD_PRODUCT_CART } from "./actionsDashboardAdmin";

export const GET_CART = "GET_CART";

export const obtenerCarrito = (idUsuario, token) => {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "GET",
        url: "/cart/" + idUsuario,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({
        type: GET_CART,
        payload: res.data.cart,
      });
    };
  } catch (error) {
    return new Error(error);
  }
};

export function agregarProductoCarrito(idUsuario, producto, token) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "POST",
        url: "/cart/" + idUsuario,
        data: producto,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CART, payload: res.data.cart });
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function modificarProductoCarrito(idUsuario, dataCartItem, token) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "PUT",
        url: "/cart/" + idUsuario,
        data: dataCartItem,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CART, payload: res.data.cart });
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function eliminarProductoCarrito(idUsuario, dataCartItem, token) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "DELETE",
        url: "/cart/" + idUsuario,
        data: dataCartItem,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CART, payload: res.data.cart });
    };
  } catch (error) {
    throw new Error(error);
  }
}

export function vaciarCarrito(idUsuario, idCarrito, token) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "PATCH",
        url: "/cart/" + idUsuario,
        data: idCarrito,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_CART, payload: res.data.cart });
    };
  } catch (error) {
    throw new Error(error);
  }
}

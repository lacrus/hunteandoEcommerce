import axios from "axios";

import { GET_USER } from "./actionsLogin";
export const GET_ADDRESSES = "GET_ADDRESSES";
export const GET_ORDERS = "GET_ORDERS";
export const GET_ORDER_DETAIL = "GET_ORDER_DETAIL";

export function modificarUsuario(id, datosUsuario, token) {
  delete datosUsuario.contrasena;
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/dashboard/admin/users/updateuser/" + id,
        data: datosUsuario,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_USER, payload: res.data.user });
    } catch (e) {
      throw new Error(e);
    }
  };
}

// -------------------- ACTIONS DIRECCIONES --------------------

export function obtenerDireccionesUsuario(idUsuario, token) {
  return async (dispatch) => {
    if (!token) {
      return dispatch({ type: GET_ADDRESSES, payload: [] });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/dashboard/admin/users/addresses/" + idUsuario,
          headers: {
            authorization: `${token}`,
          },
        });
        return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
      } catch (e) {
        throw new Error(e);
      }
    }
  };
}

export function crearDireccionUsuario(idUsuario, datosDireccion, token) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "POST",
        url: "/dashboard/admin/users/addresses/" + idUsuario,
        data: datosDireccion,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function modificarDireccionUsuario(idUsuario, datosDireccion, token) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "PUT",
        url: "/dashboard/admin/users/addresses/" + idUsuario,
        data: datosDireccion,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function eliminarDireccionUsuario(idUsuario, id, token) {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `/dashboard/admin/users/addresses/${idUsuario}?idAddress=${id}`,
        headers: {
          authorization: `${token}`,
        },
      });
      return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
    } catch (e) {
      throw new Error(e);
    }
  };
}

// -------------------- ACTIONS COMPRAS --------------------

export function obtenerComprasUsuario(idUsuario, token) {
  return async function (dispatch) {
    if (!token) {
      return dispatch({ type: GET_ORDERS, payload: [] });
    } else {
      try {
        const res = await axios({
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
          url: "dashboard/admin/users/compras/" + idUsuario,
        });
        return dispatch({ type: GET_ORDERS, payload: res.data.orders });
      } catch (error) {}
    }
  };
}

export function obtenerDetalleCompra(idUsuario, idCompra, token) {
  return async function (dispatch) {
    if (!token) {
      return dispatch({ type: GET_ORDER_DETAIL, payload: {} });
    } else {
      try {
        const res = await axios({
          method: "GET",
          headers: {
            authorization: `${token}`,
          },
          url: `dashboard/admin/users/detallecompra/${idUsuario}?orderId=${idCompra}`,
        });
        return dispatch({ type: GET_ORDER_DETAIL, payload: res.data.order });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

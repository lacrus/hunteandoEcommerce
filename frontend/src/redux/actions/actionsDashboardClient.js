import axios from "axios";

import { GET_USER } from "./actionsLogin";
export const GET_ADDRESSES = "GET_ADDRESSES";

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
  };
}

export function crearDireccionUsuario(idUsuario, datosDireccion, token) {
  console.log(idUsuario, datosDireccion, token);
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
      console.log(res);
      return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
    } catch (e) {
      throw new Error(e);
    }
  };
}

export function modificarrDireccionUsuario(idUsuario, datosDireccion, token) {
  console.log(datosDireccion);
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
      console.log(res);
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
      console.log(res);
      return dispatch({ type: GET_ADDRESSES, payload: res.data.addresses });
    } catch (e) {
      throw new Error(e);
    }
  };
}

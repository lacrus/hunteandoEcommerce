import axios from "axios";

export const GET_USER = "GET_USER";
export const GET_USERS = "GET_USERS";
export const CERRAR_SESION = "CERRAR_SESION";

export const registroUsuario = (datosUsuario) => {
  let dataUser = {
    username: datosUsuario.email,
    email: datosUsuario.email,
    password: datosUsuario.contrasena,
  };
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "POST",
        data: dataUser,
        url: "/auth/register",
      });
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
        return dispatch({
          type: GET_USER,
          payload: res.data.user,
          success: true,
        });
      } else {
        return {
          success: false,
          mensaje: res.data.error.errors[0].message || "Error al registrar",
        };
      }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export const iniciarSesion = (datosUsuario) => {
  let dataUser = {
    email: datosUsuario.email,
    password: datosUsuario.contrasena,
  };
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "POST",
        data: dataUser,
        // withCredentials: true,
        url: "/auth/login",
      });
      if (res.data.success === true) {
        localStorage.setItem("token", res.data.token);
        return dispatch({
          type: GET_USER,
          payload: res.data.user,
          token: res.data.token,
          success: true,
        });
      } else {
        return {
          success: false,
          mensaje:
            res.data.error.errors[0].message || "Error al iniciar sesión",
        };
      }
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export const cerrarSesion = () => {
  try {
    return async function (dispatch) {
      // let res = await axios({
      //   method: "POST",
      //   data: dataUser,
      //   withCredentials: true,
      //   url: "/auth/login",
      // });
      return dispatch({
        type: CERRAR_SESION,
      });
    };
  } catch (error) {
    return { success: false, mensaje: error.message };
  }
};

export function logearToken(token) {
  try {
    return async function (dispatch) {
      const res = await axios({
        method: "GET",
        url: "/auth/login/" + token,
      });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      return dispatch({
        type: GET_USER,
        payload: res.data.user,
      });
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

export function recuperarContrasena(email) {
  return async function (dispatch) {
    try {
      const respuesta = await axios({
        method: "POST",
        data: {
          email,
        },
        url: `/auth/recuperarcontrasena`,
      });
      return;
    } catch (e) {
      return new Error(e);
    }
  };
}

export function cambiarContrasena(contrasena, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        url: "/auth/cambiarcontrasena",
        data: { password: contrasena },
        headers: {
          authorization: `${token}`,
        },
      });
      console.log(res);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: GET_USER,
        payload: res.data.user,
        success: true,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

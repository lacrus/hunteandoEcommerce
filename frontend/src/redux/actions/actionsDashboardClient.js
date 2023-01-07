import axios from "axios";

export const MODIFY_USDER = "MODIFY_USDER";

export default function modificarUsuario(id, datosUsuario, token) {
  console.log("datosUsuario", datosUsuario);
  delete datosUsuario.contrasena;
  console.log("datosUsuario", datosUsuario);
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
      console.log(res);
      return dispatch({ type: "GET_USER", payload: res.data.user });
    } catch (e) {
      throw new Error(e);
    }
  };
}

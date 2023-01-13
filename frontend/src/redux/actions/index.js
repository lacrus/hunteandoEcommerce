import axios from "axios";

export function mandarMailContactame(formulario) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        data: formulario,
        url: "/contacto/mailcontacto",
      });
      return;
    } catch (error) {
      return new Error(error);
    }
  };
}

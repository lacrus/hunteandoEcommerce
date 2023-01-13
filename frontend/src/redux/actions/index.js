import axios from "axios";

export function mandarMailContactame(formulario) {
  console.log(formulario);
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        data: formulario,
        url: "/contacto/mailcontacto",
      });
      console.log(res);
      return;
    } catch (error) {
      return new Error(error);
    }
  };
}

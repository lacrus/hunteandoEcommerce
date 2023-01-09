import axios from "axios";

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
      console.log("GET_CART", res);
      return dispatch({
        type: GET_CART,
        payload: res.data.cart,
      });
    };
  } catch (error) {
    console.log(error);
    return new Error(error);
  }
};

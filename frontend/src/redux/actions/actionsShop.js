import axios from "axios";

export const GET_RANDOM_PRODUCTS_TIENDA = "GET_RANDOM_PRODUCTS_TIENDA";

export const obtenerProductosRandomTienda = () => {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "GET",
        url: "/shop/random",
      });
      return dispatch({
        type: GET_RANDOM_PRODUCTS_TIENDA,
        payload: res.data.products,
      });
    };
  } catch (error) {
    return new Error(error);
  }
};
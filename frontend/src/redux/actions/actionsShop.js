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

export function compraConML(idUsuario, carritoCompra, token) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        url: "/finalizarcompra/mercadopago/" + idUsuario,
        data: carritoCompra,
        headers: {
          authorization: `${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return new Error(error);
    }
  };
}

export function verificarPago(pagoId) {
  return async function (dispatch) {
    try {
      const res = await axios({
        method: "POST",
        data: {
          action: "desdeFront",
          data: { id: pagoId },
        },
        url: `/finalizarcompra/mercadopago/respuesta`,
      });
    } catch (error) {
      throw new Error(error);
    }
  };
}

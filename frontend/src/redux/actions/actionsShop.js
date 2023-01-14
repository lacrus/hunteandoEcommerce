import axios from "axios";

export const GET_RANDOM_PRODUCTS_TIENDA = "GET_RANDOM_PRODUCTS_TIENDA";
export const GET_PRODUCTS_TIENDA = "GET_PRODUCTS_TIENDA";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";

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

export function obtenerProductosRandomTienda() {
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
}

export function obtenerProductosTienda(porpag) {
  try {
    return async function (dispatch) {
      let res = await axios({
        method: "GET",
        url: `/shop/randomall/${porpag}`,
      });
      return dispatch({
        type: GET_PRODUCTS_TIENDA,
        payload: res.data.products,
      });
    };
  } catch (error) {
    return new Error(error);
  }
}

export function obtenerDetallesProducto(id) {
  return async function (dispatch) {
    if (!id) {
      return dispatch({ type: GET_PRODUCT_DETAIL, payload: {} });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/shop/productdetails/" + id,
        });
        if (!res.data.product) {
          throw new Error("Producto inexistente");
        } else {
          return dispatch({
            type: GET_PRODUCT_DETAIL,
            payload: res.data.product,
          });
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };
}

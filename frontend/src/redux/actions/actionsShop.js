import axios from "axios";

export const GET_RANDOM_PRODUCTS_TIENDA = "GET_RANDOM_PRODUCTS_TIENDA";
export const GET_PRODUCTS_TIENDA = "GET_PRODUCTS_TIENDA";
export const GET_PRODUCT_DETAIL = "GET_PRODUCT_DETAIL";
export const GET_CATEGORIES = "GET_CATEGORIES";

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

export function obtenerProductosRandomTienda(reset) {
  return async function (dispatch) {
    if (reset) {
      return dispatch({
        type: GET_RANDOM_PRODUCTS_TIENDA,
        payload: [],
      });
    } else {
      try {
        let res = await axios({
          method: "GET",
          url: "/shop/random",
        });
        return dispatch({
          type: GET_RANDOM_PRODUCTS_TIENDA,
          payload: res.data.products,
        });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

export function obtenerProductosTienda(porpag, filtros) {
  try {
    return async function (dispatch) {
      if (!porpag) {
        return dispatch({
          type: GET_PRODUCTS_TIENDA,
          payload: [],
          total: 0,
        });
      } else {
        let res = await axios({
          method: "GET",
          url: `/shop/filtered/${porpag}?pag=${filtros?.pag || 1}&price=${
            filtros?.price || "all"
          }&stock=${filtros?.stock || false}&ordenado=${
            filtros?.ordenado || "name"
          }&orden=${filtros?.orden || "ASC"}`,
        });
        return dispatch({
          type: GET_PRODUCTS_TIENDA,
          payload: res.data.products,
          total: res.data.total,
        });
      }
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

export function obtenerCategorias(reset) {
  return async function (dispatch) {
    if (reset) {
      return dispatch({ type: GET_CATEGORIES, payload: [] });
    } else {
      try {
        const res = await axios({
          method: "GET",
          url: "/shop/categories",
        });
        return dispatch({ type: GET_CATEGORIES, payload: res.data.categories });
      } catch (error) {
        return new Error(error);
      }
    }
  };
}

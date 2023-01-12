import {
  GET_RANDOM_PRODUCTS_TIENDA,
  GET_PRODUCTS_TIENDA,
  GET_PRODUCT_DETAIL,
} from "../actions/actionsShop";

const initialState = {
  productosRandom: [],
  productosTienda: [],
  detallesProducto: {},
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RANDOM_PRODUCTS_TIENDA:
      return {
        ...state,
        productosRandom: action.payload,
      };
    case GET_PRODUCTS_TIENDA:
      return {
        ...state,
        productosTienda: action.payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detallesProducto: action.payload,
      };
    default:
      return { ...state };
  }
};

export default shopReducer;

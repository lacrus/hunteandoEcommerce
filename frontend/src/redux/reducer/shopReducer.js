import {
  GET_RANDOM_PRODUCTS_TIENDA,
  GET_PRODUCTS_TIENDA,
  GET_PRODUCT_DETAIL,
  GET_CATEGORIES,
} from "../actions/actionsShop";

const initialState = {
  productosRandom: [],
  productosTienda: [],
  totalProductos: 0,
  detallesProducto: {},
  categorias: [],
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
        totalProductos: action.total,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detallesProducto: action.payload,
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categorias: action.payload,
      };
    default:
      return { ...state };
  }
};

export default shopReducer;

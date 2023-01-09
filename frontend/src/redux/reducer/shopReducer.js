import { GET_RANDOM_PRODUCTS_TIENDA } from "../actions/actionsShop";

const initialState = {
  productosRandom: [],
};

const shopReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RANDOM_PRODUCTS_TIENDA:
      return {
        ...state,
        productosRandom: action.payload,
      };
    default:
      return { ...state };
  }
};

export default shopReducer;

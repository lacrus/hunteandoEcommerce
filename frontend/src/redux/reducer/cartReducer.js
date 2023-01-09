// CASE ACTIONS
import { GET_USER, GET_USERS } from "./../actions/actionsLogin";
import {
  ORDER_USERS,
  ORDER_PRODUCTS,
  ADD_PRODUCT_CART,
  DELETE_PRODUCT_CART,
  MODIFY_PRODUCT_CART,
  DELETE_CART,
  GET_PRODUCTS,
  GET_DELETED_PRODUCTS,
  GET_USER_DETAILS,
} from "../actions/actionsDashboardAdmin";
import { GET_CART } from "../actions/actionsCart";

const initialState = {
  carro: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        carro: action.payload,
      };
    default:
      return { ...state };
  }
};

export default cartReducer;

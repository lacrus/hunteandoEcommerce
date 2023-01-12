import { CERRAR_SESION } from "./../actions/actionsLogin";
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

    case CERRAR_SESION:
      return { ...state, carro: [] };
    default:
      return { ...state };
  }
};

export default cartReducer;

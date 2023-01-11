// CASE ACTIONS
import { CERRAR_SESION } from "./../actions/actionsLogin";
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
} from "../actions/actionsDashboardClient";

const initialState = {
  comprasUsuario: [],
  detalleCompra: {},
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        ...state,
        comprasUsuario: action.payload,
      };
    case GET_ORDER_DETAIL:
      return {
        ...state,
        detalleCompra: action.payload,
      };

    case CERRAR_SESION:
      return { ...state, comprasUsuario: [], detalleCompra: {} };
    default:
      return { ...state };
  }
};

export default cartReducer;

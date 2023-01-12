// CASE ACTIONS
import { CERRAR_SESION } from "./../actions/actionsLogin";
import {
  GET_ORDERS,
  GET_ORDER_DETAIL,
} from "../actions/actionsDashboardClient";

import { GET_SALES, GET_SALE_DETAILS } from "../actions/actionsDashboardAdmin";

const initialState = {
  comprasUsuario: [],
  detalleCompra: {},
  ventas: [],
  detalleVenta: {},
};

const dashboardReducer = (state = initialState, action) => {
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
    case GET_SALES:
      return {
        ...state,
        ventas: action.payload,
      };

    case GET_SALE_DETAILS:
      return {
        ...state,
        detalleVenta: action.payload,
      };

    case CERRAR_SESION:
      return { ...state, comprasUsuario: [], detalleCompra: {} };
    default:
      return { ...state };
  }
};

export default dashboardReducer;

// CASE ACTIONS
import { GET_USER, GET_USERS, CERRAR_SESION } from "./../actions/actionsLogin";
import {
  ORDER_USERS,
  ORDER_PRODUCTS,
  GET_PRODUCTS,
  GET_DELETED_PRODUCTS,
  GET_USER_DETAILS,
} from "../actions/actionsDashboardAdmin";
import { GET_ADDRESSES } from "../actions/actionsDashboardClient";

import functionOrdernarUsuarios from "../../utils/functionOdenarUsuarios";
import functionOrdernarProductos from "../../utils/functionOdenarProductos";

const initialState = {
  usuario: {},
  direccionesUsuario: [],
  detallesUsuario: {},
  detalleProducto: {},
  // Store Admin
  usuarios: [],
  ordenUsuarios: { id: "asc", username: null, email: null, role: null },
  productos: [],
  productosEliminados: [],
  ordenProductos: { id: "asc", name: null, price: null },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        usuario: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        usuarios: action.payload,
      };

    case GET_USER_DETAILS:
      return {
        ...state,
        detallesUsuario: action.payload,
      };
    case CERRAR_SESION:
      return {
        ...state,
        usuario: {},
        direccionesUsuario: [],
        detallesUsuario: {},
        detalleProducto: {},
        usuarios: [],
        ordenUsuarios: { id: "asc", username: null, email: null, role: null },
        productos: [],
        productosEliminados: [],
        ordenProductos: { id: "asc", name: null, price: null },
      };

    case GET_ADDRESSES:
      return {
        ...state,
        direccionesUsuario: action.payload,
      };

    case GET_PRODUCTS:
      return {
        ...state,
        productos: action.payload,
      };

    case GET_DELETED_PRODUCTS:
      return {
        ...state,
        productosEliminados: action.payload,
      };

    // ACTIONS ORDENAR DASHBOARD
    case ORDER_PRODUCTS:
      const respuestaFunctionOrdenarProductos = functionOrdernarProductos(
        action.payload, // columna a ordenar
        state.ordenProductos, // estado de como esta el orden
        state.productos // listado a ordenar
      );
      return {
        ...state,
        productos: respuestaFunctionOrdenarProductos.productosOrdenados,
        ordenProductos: respuestaFunctionOrdenarProductos.ordenProductos,
      };

    case ORDER_USERS:
      const respuestaFunctionOrdenarUsuarios = functionOrdernarUsuarios(
        action.payload,
        state.ordenUsuarios,
        state.usuarios
      );
      return {
        ...state,
        usuarios: respuestaFunctionOrdenarUsuarios.listadoOrdenar,
        ordenUsuarios: respuestaFunctionOrdenarUsuarios.ordenColumnas,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;

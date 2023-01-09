import React from "react";
import { useDispatch } from "react-redux";
import { modificarCantidadProductoCarrito } from "../../../redux/actions/actionsDashboardAdmin";
import s from "./Counter.module.css";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { modificarProductoCarrito } from "../../../redux/actions/actionsCart";

export default function Counter({
  userId,
  token,
  cantidadInicial,
  cantidadDisponible,
  idProducto,
  handleEliminarProducto,
  itemCartId,
}) {
  const dispatch = useDispatch();

  async function handlerSumar() {
    if (cantidadInicial < cantidadDisponible) {
      const dataCartItem = {
        id: itemCartId,
        quantity: cantidadInicial + 1,
      };
      await dispatch(modificarProductoCarrito(userId, dataCartItem, token));
    } else {
      Swal.fire({
        icon: "warning",
        title: "Disculpa",
        text: `Hay ${cantidadDisponible} unidades disponibles`,
      });
    }
  }

  async function handlerRestar() {
    if (cantidadInicial > 1) {
      const dataCartItem = {
        id: itemCartId,
        quantity: cantidadInicial - 1,
      };
      await dispatch(modificarProductoCarrito(userId, dataCartItem, token));
    } else {
      handleEliminarProducto();
    }
  }

  return (
    <div className={s.contenedorContador}>
      <div
        className={`${s.contenedorBotonContador} ${
          cantidadInicial >= cantidadDisponible ? s.botonDesabilitado : null
        }`}
        onClick={handlerSumar}
      >
        <div>+</div>
      </div>
      <div className={s.contenedorCantidad}>
        <p>{cantidadInicial}</p>
      </div>
      <div
        className={`${s.contenedorBotonContador} ${
          cantidadInicial <= 1 ? s.botonDesabilitado : null
        }`}
        onClick={handlerRestar}
      >
        {cantidadInicial <= 1 ? <MdDelete color="red" /> : <div>-</div>}
      </div>
    </div>
  );
}

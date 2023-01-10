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
  setCargandoProducto,
}) {
  const dispatch = useDispatch();

  async function handleModificar(accion) {
    try {
      if (accion === "sumar") {
        if (cantidadInicial < cantidadDisponible) {
          const dataCartItem = {
            id: itemCartId,
            quantity: cantidadInicial + 1,
          };
          setCargandoProducto(true);
          await dispatch(modificarProductoCarrito(userId, dataCartItem, token));
          setCargandoProducto(false);
        } else {
          Swal.fire({
            icon: "warning",
            title: "Disculpa",
            text: `Hay ${cantidadDisponible} unidades disponibles`,
          });
        }
      } else {
        if (cantidadInicial > 1) {
          const dataCartItem = {
            id: itemCartId,
            quantity: cantidadInicial - 1,
          };
          setCargandoProducto(true);
          await dispatch(modificarProductoCarrito(userId, dataCartItem, token));
          setCargandoProducto(false);
        } else {
          handleEliminarProducto();
        }
      }
    } catch (e) {
      Swal.fire("Hubo un problema!", "Intentalo nuevamente mas tarde", "error");
    }
  }

  return (
    <div className={s.contenedorContador}>
      <div
        className={`${s.contenedorBotonContador} ${
          cantidadInicial >= cantidadDisponible ? s.botonDesabilitado : null
        }`}
        onClick={() => handleModificar("sumar")}
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
        onClick={() => handleModificar("restar")}
      >
        {cantidadInicial <= 1 ? <MdDelete color="red" /> : <div>-</div>}
      </div>
    </div>
  );
}

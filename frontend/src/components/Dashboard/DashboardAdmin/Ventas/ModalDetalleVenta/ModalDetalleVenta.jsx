import React, { useEffect, useState } from "react";
import s from "./ModalDetalleVenta.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle, AiOutlineLogout } from "react-icons/ai";
import {
  modificarEstadoEnvio,
  obtenerDetallesVentaUsuario,
  obtenerVentasUsuarios,
} from "../../../../../redux/actions/actionsDashboardAdmin";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

function ModalDetalleVenta({
  idVenta,
  setMostrarDetalleVenta,
  setIdVenta,
  Loading,
}) {
  const [cargando, setCargando] = useState(false);
  const [cambiandoEstado, setCambiandoEstado] = useState(false);
  const detalleVenta = useSelector((e) => e.dashboard.detalleVenta);
  const dispatch = useDispatch();

  async function handleChangeShippingStatus(e) {
    setCambiandoEstado(true);
    Swal.fire({
      title: "Cambiando estado del envío",
      text: "Confirma realizar la acción?",
      icon: "question",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      try {
        if (isConfirmed) {
          const token = localStorage.getItem("token");
          await dispatch(
            modificarEstadoEnvio(
              idVenta,
              { shippingStatus: e.target.value },
              token
            )
          );
          await dispatch(obtenerVentasUsuarios(token));
        } else {
          e.target.value = detalleVenta?.shippingStatus;
        }
      } catch (error) {
        Swal.fire(
          "Error al cambiar el rol de usuario",
          "Intentalo nuevamente mas tarde",
          "error"
        );
      } finally {
        setCambiandoEstado(false);
      }
    });
  }

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerDetallesVentaUsuario(idVenta, token)); // ACTION para recibir los detalles de la venta
      } catch (e) {
        Swal.fire("Hubo un problema", "Vuelve a intentarlo mas tarde", "error");
      }
      setCargando(false);
    })();

    return () => {
      dispatch(obtenerDetallesVentaUsuario());
    };
  }, []);

  return (
    <div className={s.contenedorDetalleVenta}>
      <div className={s.contenedorIntermedioDetalleVenta}>
        {cargando ? (
          <Loading />
        ) : (
          <>
            <div className={s.tituloDetalleVenta}>
              Detalle de la venta {idVenta}
            </div>
            <table className={s.tablaDetalleVenta}>
              <thead className={s.encabezadoDetalleVenta}>
                <tr>
                  <th>Id venta</th>
                  <th>Total</th>
                  <th>Mail</th>
                  <th>Fecha venta</th>
                  <th>Estado pago</th>
                  <th>Estado envío</th>
                  <th>Dirección</th>
                </tr>
              </thead>
              <tbody className={s.bodyDetalleVenta}>
                <tr>
                  <td>{detalleVenta?.id}</td>
                  <td>$ {detalleVenta?.total}</td>
                  <td>{detalleVenta?.User?.email}</td>
                  <td>{detalleVenta?.createdAt?.slice(0, 10)}</td>
                  <td>
                    <div
                      className={s.statusVenta}
                      style={{
                        backgroundColor:
                          detalleVenta?.paymentStatus === "failure"
                            ? "red"
                            : detalleVenta?.paymentStatus === "pending"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {detalleVenta?.paymentStatus}
                    </div>
                  </td>
                  <td>
                    {cambiandoEstado ? (
                      <div className={s.contenedorSpinnerSelect}>
                        <PulseLoader color="orange" size="12px" />
                      </div>
                    ) : detalleVenta?.shippingStatus !== "completed" ? (
                      <select
                        name="shippingStatus"
                        id="shippingStatus"
                        defaultValue={detalleVenta?.shippingStatus}
                        onChange={handleChangeShippingStatus}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="sending">Enviado</option>
                        <option value="completed">Entregado</option>
                      </select>
                    ) : (
                      <div
                        className={s.statusVenta}
                        style={{
                          backgroundColor: "green",
                        }}
                      >
                        {detalleVenta?.shippingStatus}
                      </div>
                    )}
                  </td>
                  <td className={s.renglonDireccion}>
                    {detalleVenta?.shippingAddress?.slice(0, 15) +
                      (detalleVenta?.shippingAddress?.length > 15
                        ? "..."
                        : null)}
                    <div className={s.direccionHover}>
                      {detalleVenta?.shippingAddress}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className={s.tituloProductosDetalleVenta}>
              Productos de la venta
            </div>
            <table className={s.tablaDetalleVenta}>
              <thead className={s.encabezadoDetalleVenta}>
                <tr>
                  <th>Id</th>
                  <th>Nombre</th>
                  <th>Cant. ordenada</th>
                  <th>Precio</th>
                  <th>Total</th>
                  <th>Ir al producto</th>
                </tr>
              </thead>
              <tbody className={s.bodyDetalleVenta}>
                {detalleVenta?.OrderItems?.map((i) => {
                  return (
                    <tr>
                      <td>{i.id}</td>
                      <td>{i.name}</td>
                      <td>{i.quantity}</td>
                      <td>$ {i.price}</td>
                      <td>$ {i.quantity * i.price}</td>
                      <td>
                        <Link
                          className={s.linkDetalleVenta}
                          to={`/tienda/detalles/${i.id}`}
                          target="_blank"
                          rel="noopener no referrer"
                        >
                          <AiOutlineLogout />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      <AiOutlineCloseCircle
        onClick={() => {
          setMostrarDetalleVenta(false);
          setIdVenta(null);
        }}
        className={s.iconoCerrar}
      />
    </div>
  );
}

export default ModalDetalleVenta;

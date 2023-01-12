import React, { useEffect, useState } from "react";
import s from "./DetallesUsuario.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { obtenerDetalleCompletoUuario } from "../../../../../redux/actions/actionsDashboardAdmin";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";
import { CgDetailsMore } from "react-icons/cg";

function DetallesUsuario({
  mostrarDetallesUsuario,
  setMostrarDetallesUsuario,
  idUsuario,
  setIdUsuario,
}) {
  const dispatch = useDispatch();
  const detallesUsuario = useSelector((e) => e.general.detallesUsuario);

  const [loading, setLoading] = useState(false);

  function handleClickCerrarFondo(e) {
    if (e.target.id === "fondoContenedor") setMostrarDetallesUsuario(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerDetalleCompletoUuario(idUsuario, token));
      } catch (error) {
        Swal.fire(
          "Error..",
          "No se pudieron obtener los detalles del usuario",
          "error"
        );
      }
      setLoading(false);
    })();

    return () => {
      dispatch(obtenerDetalleCompletoUuario());
    };
  }, []);

  useEffect(() => {
    return () => {
      dispatch(obtenerDetalleCompletoUuario());
    };
  }, []);

  return (
    <div
      onClick={handleClickCerrarFondo}
      id="fondoContenedor"
      className={s.contenedorComprasUsuario}
    >
      <div className={s.contenedorIntermedioComprasUsuario}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={s.tituloDetallesUsuario}>
              Detalles usuario {detallesUsuario.username}
            </div>
            <div className={s.contenedorIntermedioComprasUsuario}>
              <table className={s.tablaComprasUsuario}>
                <thead>
                  <tr className={s.encabezadoComprasUsuario}>
                    <th>Id</th>
                    <th>E-mail</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Rol</th>
                    <th>Usuario desde</th>
                  </tr>
                </thead>
                <tbody className={s.bodyComprasUsuario}>
                  <tr>
                    <td>{detallesUsuario?.id}</td>
                    <td>{detallesUsuario?.email}</td>
                    <td>
                      {detallesUsuario?.UserDetail?.firstname ||
                        "Sin especificar"}
                    </td>
                    <td>
                      {detallesUsuario?.UserDetail?.lastname ||
                        "Sin especificar"}
                    </td>
                    <td>{detallesUsuario?.role}</td>
                    <td>
                      {detallesUsuario?.UserDetail?.createdAt?.slice(0, 10)}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className={s.tituloComprasUsuario}>Compras usuario</div>
              <table className={s.tablaComprasUsuario}>
                <thead>
                  <tr className={s.encabezadoComprasUsuario}>
                    <th>Id venta</th>
                    <th>Creada</th>
                    <th>Actualizada</th>
                    <th>Total</th>
                    <th>Estado pago</th>
                    <th>Estado entrega</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody className={s.bodyComprasUsuario}>
                  {detallesUsuario?.Orders?.length
                    ? detallesUsuario?.Orders.map((a) => {
                        return (
                          <tr key={"ventas" + a.id}>
                            <td>{a.id}</td>
                            <td>{a.createdAt.slice(0, 10)}</td>
                            <td>{a.updatedAt.slice(0, 10)}</td>
                            <td>$ {a.total}</td>
                            <td>
                              <div
                                className={s.statusVenta}
                                style={{
                                  backgroundColor:
                                    a.paymentStatus === "failure"
                                      ? "red"
                                      : a.paymentStatus === "pending"
                                      ? "orange"
                                      : "green",
                                }}
                              >
                                {a.paymentStatus}
                              </div>
                            </td>
                            <td>
                              <div
                                className={s.statusVenta}
                                style={{
                                  backgroundColor:
                                    a.shippingStatus === "pending"
                                      ? "red"
                                      : a.shippingStatus === "sending"
                                      ? "orange"
                                      : "green",
                                }}
                              >
                                {a.shippingStatus}
                              </div>
                            </td>
                            <td>
                              <div
                                className={s.botonDetallesVenta}
                                // onClick={(e) => handleVerDetalle(e, a.id)}
                              >
                                <CgDetailsMore />
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>

              <div className={s.tituloComprasUsuario}>
                Direcciones actuales usuario
              </div>
              <table className={s.tablaComprasUsuario}>
                <thead>
                  <tr className={s.encabezadoComprasUsuario}>
                    <th>Dirección</th>
                    <th>Ciudad</th>
                    <th>C.P.</th>
                    <th>Provincia</th>
                    <th>Detalles</th>
                    <th>Contacto</th>
                  </tr>
                </thead>
                <tbody className={s.bodyComprasUsuario}>
                  {detallesUsuario?.Addresses?.length
                    ? detallesUsuario?.Addresses.map((a) => {
                        return (
                          <tr key={"direcciones" + a.id}>
                            <td>{a.street + " " + a.number}</td>
                            <td>{a.city}</td>
                            <td>{a.zipCode}</td>
                            <td>{a.province}</td>
                            <td>{a.detail ? a.detail : "Sin detalles"}</td>
                            <td>{a.contact ? a.contact : "Sin contacto"}</td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
      <AiOutlineCloseCircle
        onClick={() => {
          setMostrarDetallesUsuario(!mostrarDetallesUsuario);
          setIdUsuario(null);
        }}
        className={s.iconoCerrar}
      />
    </div>
  );
}

export default DetallesUsuario;

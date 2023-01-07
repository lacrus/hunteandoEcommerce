import React, { useEffect, useState } from "react";
import s from "./DetallesUsuario.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { obtenerDetallesUsuario } from "../../../../../redux/actions/actionsDashboardAdmin";
import Swal from "sweetalert2";
import Loading from "../../../../Loading/Loading";

function DetallesUsuario({
  mostrarDetallesUsuario,
  setMostrarDetallesUsuario,
  idUsuario,
  setIdUsuario,
}) {
  const dispatch = useDispatch();
  const detallesUsuario = useSelector((e) => e.detallesUsuario);

  const [loading, setLoading] = useState(false);

  function handleClickCerrarFondo(e) {
    console.log(e.target.id);
    if (e.target.id === "fondoContenedor") setMostrarDetallesUsuario(false);
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerDetallesUsuario(idUsuario, token));
      } catch (error) {
        Swal.fire(
          "Error..",
          "No se pudieron obtener las compras del usuario",
          "error"
        );
      }
      setLoading(false);
    })();
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
                  </tr>
                </thead>
                <tbody className={s.bodyComprasUsuario}>
                  <tr>
                    <td>{detallesUsuario.id}</td>
                    <td>{detallesUsuario.email}</td>
                    <td>{detallesUsuario.firstname || "Sin especificar"}</td>
                    <td>{detallesUsuario.lastname || "Sin especificar"}</td>
                  </tr>
                </tbody>
              </table>
              <div className={s.tituloComprasUsuario}>Compras usuario</div>
              <table className={s.tablaComprasUsuario}>
                <thead>
                  <tr className={s.encabezadoComprasUsuario}>
                    <th>Id venta</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Estado pago</th>
                    <th>Estado entrega</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                {/*  <tbody className={s.bodyComprasUsuario}>
              {Object.keys(detallesUsuario).length &&
                detallesUsuario?.map((a) => {
                  return (
                    <tr key={"ventas" + a.id}>
                      <td>{a.id}</td>
                      <td>{a.date}</td>
                      <td>{a.total}</td>
                      <td>
                        <div
                          className={s.statusVenta}
                          style={{
                            backgroundColor:
                              a.status === "failure"
                                ? "red"
                                : a.status === "pending"
                                ? "orange"
                                : "green",
                          }}
                        >
                          {a.status}
                        </div>
                      </td>
                      <td>
                        <div
                          className={s.statusVenta}
                          style={{
                            backgroundColor:
                              a.statusDelivery === "failure"
                                ? "red"
                                : a.statusDelivery === "pending"
                                ? "orange"
                                : "green",
                          }}
                        >
                          {a.statusDelivery}
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
                })} 
            </tbody> */}
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

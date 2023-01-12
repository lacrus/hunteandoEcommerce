import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Ventas.module.css";
import { CgDetailsMore } from "react-icons/cg";
import ModalDetalleVenta from "./ModalDetalleVenta/ModalDetalleVenta";
import functionOrdernarVentas from "../../../../utils/functionOdenarVentas";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { obtenerVentasUsuarios } from "../../../../redux/actions/actionsDashboardAdmin";
import Loading from "../../../Loading/Loading";

function Ventas() {
  const dispatch = useDispatch();
  // const ventas = useSelector((e) => e.general.ventas);
  const ventas = useSelector((e) => e.dashboard.ventas);
  const [mostrarDetalleVenta, setMostrarDetalleVenta] = useState(false);
  const [idVenta, setIdVenta] = useState(null);

  function handleVerDetalle(e, idVenta) {
    setMostrarDetalleVenta(!mostrarDetalleVenta);
    setIdVenta(idVenta);
  }

  const [loading, setLoading] = useState(false);
  const [ventasOrdenadas, setVentasOrdenadas] = useState([...ventas]);
  const [ordenarVentas, setOrdenarVentas] = useState({
    id: "asc",
    date: null,
    total: null,
    idUser: null,
    mailUser: null,
    status: null,
    statusDelivery: null,
  });

  function handleOrdenarVentas(columna) {
    functionOrdernarVentas(
      columna,
      ordenarVentas,
      setOrdenarVentas,
      ventasOrdenadas
    );
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerVentasUsuarios(token));
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: e.message,
        });
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    return function cleanup() {
      dispatch(obtenerVentasUsuarios());
    };
  }, []);

  return (
    <div className={s.contenedorVentas}>
      {loading ? (
        <div className={s.contenedorLoading}>
          <Loading />
        </div>
      ) : (
        <>
          <table className={s.tablaVentas}>
            <thead>
              <tr className={s.encabezadoVentas}>
                <th
                  onClick={() => handleOrdenarVentas("id")}
                  className={s.cursor}
                >
                  Id venta
                </th>
                <th
                  onClick={() => handleOrdenarVentas("date")}
                  className={s.cursor}
                >
                  Fecha
                </th>
                <th
                  onClick={() => handleOrdenarVentas("total")}
                  className={s.cursor}
                >
                  Total
                </th>
                <th
                  onClick={() => handleOrdenarVentas("mailUser")}
                  className={s.cursor}
                >
                  Mail usuario
                </th>
                <th
                  onClick={() => handleOrdenarVentas("status")}
                  className={s.cursor}
                >
                  Estado pago
                </th>
                <th
                  onClick={() => handleOrdenarVentas("statusDelivery")}
                  className={s.cursor}
                >
                  Estado entrega
                </th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody className={s.bodyVentas}>
              {ventas?.length
                ? ventas?.map((a) => {
                    return (
                      <tr key={"ventas" + a.id}>
                        <td>{a.id}</td>
                        <td>{a.createdAt.slice(0, 10)}</td>
                        <td>{a.total}</td>
                        <td>{a.User.email}</td>
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
                            onClick={(e) => handleVerDetalle(e, a.id)}
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
          {mostrarDetalleVenta && (
            <ModalDetalleVenta
              setMostrarDetalleVenta={setMostrarDetalleVenta}
              setIdVenta={setIdVenta}
              idVenta={idVenta}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Ventas;

import React, { useState } from "react";
import s from "./PanelComprasUsuario.module.css";
import { useDispatch, useSelector } from "react-redux";
import { CgDetailsMore } from "react-icons/cg";
import { useEffect } from "react";
import { obtenerComprasUsuario } from "../../../../redux/actions/actionsDashboardClient";
import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";
import resizeHook from "../../../../hooks/resizeHook";
import DetallesCompra from "./DetallesCompra/DetallesCompra";

function PanelComprasUsuario({ token, usuario }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [detallesCompra, setDetallesCompra] = useState(false);

  function handleDetallesCompra(id) {
    setDetallesCompra(id);
  }

  const comprasUsuario = useSelector((e) => e.dashboard.comprasUsuario);
  const anchoPantalla = resizeHook().width;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await dispatch(obtenerComprasUsuario(usuario.id, token));
      } catch (error) {
        Swal.fire("Hubo un error!", "Vuelve a intentarlo mas tarde", "error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className={s.contenedorPanelComprasUsuario}>
      <div className={s.tituloPanelComprasUsuario}>Mis compras</div>
      <table className={s.tablaPanelComprasUsuario}>
        <thead>
          <tr className={s.encabezadoPanelComprasUsuario}>
            <th>Id</th>
            <th>Total</th>
            {anchoPantalla > 800 ? <th>Metodo pago</th> : null}
            <th>Estado Pago</th>
            <th>Estado envío</th>
            <th>Detalles</th>
          </tr>
        </thead>

        <tbody className={s.bodyPanelComprasUsuario}>
          {comprasUsuario?.length ? (
            comprasUsuario?.map((i) => {
              return (
                <tr>
                  <td>{i.id}</td>
                  <td>$ {i.total}</td>
                  {anchoPantalla > 800 ? <td>{i.paymentMethod}</td> : null}
                  <td className={s.renglonEstadoCompra}>
                    <div
                      className={s.statusCompra}
                      style={{
                        backgroundColor:
                          i.paymentStatus === "failure"
                            ? "red"
                            : i.paymentStatus === "pending"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {i.paymentStatus}
                    </div>
                    <div
                      onClick={() => {
                        return i.paymentStatus !== "paid"
                          ? window.open(i.paymentLink, "_blank")
                          : null;
                      }}
                      className={s.statusCompra}
                      style={{
                        backgroundColor: "#009ee3",
                        cursor: "pointer",
                        width: "fit-content",
                        padding: "0 3%",
                        marginTop: "1%",
                      }}
                    >
                      Volver al pago
                    </div>
                  </td>
                  <td>
                    <div
                      className={s.statusCompra}
                      style={{
                        backgroundColor:
                          i.shippingStatus === "failure"
                            ? "red"
                            : i.shippingStatus === "pending"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {i.shippingStatus}
                    </div>
                  </td>
                  <td>
                    <div
                      className={s.botonPanelComprasUsuario}
                      onClick={() => handleDetallesCompra(i.id)}
                    >
                      <CgDetailsMore />
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td className={s.renglonVacio}>Sin datos</td>
              <td></td>
              <td></td>
            </tr>
          )}
        </tbody>
      </table>
      {detallesCompra ? (
        <DetallesCompra
          token={token}
          usuario={usuario}
          id={detallesCompra}
          setDetallesCompra={setDetallesCompra}
        />
      ) : null}
    </div>
  );
}

export default PanelComprasUsuario;

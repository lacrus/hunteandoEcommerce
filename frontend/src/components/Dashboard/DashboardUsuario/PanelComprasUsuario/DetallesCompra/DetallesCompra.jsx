import React, { useState } from "react";
import s from "./DetallesCompra.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { obtenerDetalleCompra } from "../../../../../redux/actions/actionsDashboardClient";
import Swal from "sweetalert2";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Loading from "../../../../Loading/Loading";
import imgNotFound from "../../../../../assets/images/imgNotFound.jpg";

function DetallesCompra({ usuario, token, id, setDetallesCompra }) {
  const dispatch = useDispatch();
  const [cargandoCompra, setCargandoCompra] = useState(false);

  function handleCerrarDetallesCompra(e) {
    return e.target.id === "botonCerrar" ? setDetallesCompra(false) : null;
  }

  const detallesCompra = useSelector((e) => e.dashboard.detalleCompra);

  useEffect(() => {
    (async () => {
      try {
        setCargandoCompra(true);
        await dispatch(obtenerDetalleCompra(usuario.id, id, token));
      } catch (error) {
        Swal.fire("Hubo un error!", "Vuelve a intentarlo mas tarde", "error");
        setDetallesCompra(false);
      } finally {
        setCargandoCompra(false);
      }
    })();

    return () => {
      dispatch(obtenerDetalleCompra());
    };
  }, []);

  return cargandoCompra ? (
    <div className={s.contenedorLoading}>
      <Loading />
    </div>
  ) : (
    <div
      id="botonCerrar"
      onClick={handleCerrarDetallesCompra}
      className={s.contenedorDetallesCompra}
    >
      <div className={s.contenedorIntermedioDetallesCompra}>
        <div className={s.tituloDetallesCompra}>Detalle de la Compra</div>
        <table className={s.tablaDetallesCompra}>
          <thead>
            <tr className={s.encabezadoDetallesCompra}>
              <th>Id Compra</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Metodo Pago</th>
              <th>Estado Pago</th>
              <th>Estado Envío</th>
              <th>Dirección Envío</th>
            </tr>
          </thead>
          <tbody className={s.bodyDetallesCompra}>
            <tr>
              <td>{detallesCompra?.id}</td>
              <td>{detallesCompra?.createdAt?.slice(0, 10)}</td>
              <td>$ {detallesCompra?.total}</td>
              <td>{detallesCompra?.paymentMethod}</td>
              {/* <td>{detallesCompra?.paymentStatus}</td> */}
              <td>
                <div
                  className={s.statusCompra}
                  style={{
                    backgroundColor:
                      detallesCompra?.paymentStatus === "failure"
                        ? "red"
                        : detallesCompra?.paymentStatus === "pending"
                        ? "orange"
                        : "green",
                  }}
                >
                  {detallesCompra.paymentStatus}
                </div>
              </td>
              {/* <td>{detallesCompra?.shippingStatus}</td> */}
              <td>
                <div
                  className={s.statusCompra}
                  style={{
                    backgroundColor:
                      detallesCompra?.shippingStatus === "failure"
                        ? "red"
                        : detallesCompra?.shippingStatus === "pending"
                        ? "orange"
                        : "green",
                  }}
                >
                  {detallesCompra.paymentStatus}
                </div>
              </td>
              <td>
                {`${detallesCompra?.shippingAddress?.slice(0, 15)}
                  ${
                    detallesCompra?.shippingAddress?.length > 15 ? "..." : null
                  }`}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={s.tituloProdDetallesCompra}>
          Producto{detallesCompra?.OrderItems?.length > 1 ? "s" : null} de la
          Compra
        </div>
        <table className={s.tablaDetallesCompra}>
          <thead>
            <tr className={s.encabezadoDetallesCompra}>
              <th></th>

              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody className={s.bodyDetallesCompra}>
            {detallesCompra?.OrderItems?.map((i) => {
              return (
                <tr className={s.renglonProducto}>
                  <td>
                    <img
                      className={s.imgProd}
                      src={
                        i.Product?.image?.length
                          ? i.Product?.image[0]
                          : imgNotFound
                      }
                      alt="imagen producto"
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = imgNotFound;
                      }}
                    />
                  </td>
                  <td>{i.name}</td>
                  <td>{i.quantity}</td>
                  <td>$ {i.price}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AiOutlineCloseCircle
          id="botonCerrar"
          onClick={handleCerrarDetallesCompra}
          className={s.iconoCerrar}
        />
      </div>
    </div>
  );
}

export default DetallesCompra;

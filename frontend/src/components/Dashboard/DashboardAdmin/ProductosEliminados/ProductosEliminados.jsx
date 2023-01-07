import React, { useState } from "react";
import s from "./ProductosEliminados.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Swal from "sweetalert2";
import Loading from "../../../Loading/Loading";
import {
  ordenarProductos,
  obtenerProductosEliminados,
  recuperarProductoEliminado,
} from "../../../../redux/actions/actionsDashboardAdmin";
import { RiDeviceRecoverFill } from "react-icons/ri";

function ProductosEliminados({ handleMostrarMenuAdmin }) {
  const dispatch = useDispatch();
  const productosEliminados = useSelector((e) => e.productosEliminados);

  const [loading, setLoading] = useState(false);

  const [cambioOrden, setCambioOrden] = useState(false);
  function handleOrdernar(columna) {
    dispatch(ordenarProductos(columna));
    setCambioOrden(!cambioOrden);
  }

  function handleRecuperarProducto(e, idProducto) {
    try {
      Swal.fire({
        icon: "question",
        title: "Recuperar producto",
        text: "Seguro que desea recuperar el producto?",
        showCancelButton: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          const token = localStorage.getItem("token");
          await dispatch(recuperarProductoEliminado(idProducto, token));
          handleMostrarMenuAdmin("productosCreados");
        }
      });
    } catch (e) {
      Swal.fire("Error", "Hubo un problema al recupear el producto", "error");
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerProductosEliminados(token));
      } catch (e) {
        Swal.fire(
          "Error",
          "No se pudieron obtener los productos eliminados",
          "error"
        );
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div
      className={`${s.contenedorProductosEliminados} ${
        loading ? s.loadingTrue : null
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <table className={s.tablaProductosEliminados}>
          <thead>
            <tr className={s.encabezadoProductosEliminados}>
              <th onClick={() => handleOrdernar("id")} className={s.cursor}>
                Id
              </th>
              <th onClick={() => handleOrdernar("name")} className={s.cursor}>
                Nombre
              </th>
              <th onClick={() => handleOrdernar("price")} className={s.cursor}>
                Precio
              </th>
              <th>Descripción</th>
              <th>Recuperar</th>
            </tr>
          </thead>
          <tbody className={s.bodyProductosEliminados}>
            {productosEliminados.length > 0 ? (
              productosEliminados?.map((a) => {
                return (
                  <tr key={"listaProductos" + a.id}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.price}</td>
                    <td>{a.description.substring(0, 20)}</td>
                    <td>
                      <div
                        className={s.botonRecuperarProducto}
                        onClick={(e) => handleRecuperarProducto(e, a.id)}
                      >
                        <RiDeviceRecoverFill />
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
      )}
    </div>
  );
}

export default ProductosEliminados;

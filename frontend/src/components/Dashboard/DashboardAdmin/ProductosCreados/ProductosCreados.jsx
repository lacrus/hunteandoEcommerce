import React, { useEffect, useState } from "react";
import s from "./ProductosCreados.module.css";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  ordenarProductos,
  eliminarProducto,
  obtenerTodosLosProductos,
} from "../../../../redux/actions/actionsDashboardAdmin";
import ModalModificarVenta from "./ModalModificarVenta/ModalModificarVenta";
import Loading from "../../../Loading/Loading";
import Swal from "sweetalert2";

function ProductosCreados() {
  const dispatch = useDispatch();
  const productos = useSelector((e) => e.general.productos);
  const [loading, setLoading] = useState(false);

  const [editarProducto, setEditarProducto] = useState(false);
  const [producto, setProducto] = useState({});

  const [cambioOrden, setCambioOrden] = useState(false);
  function handleOrdernar(columna) {
    dispatch(ordenarProductos(columna));
    setCambioOrden(!cambioOrden);
  }

  function handleEditarProducto(e, prod) {
    setEditarProducto(true);
    setProducto(prod);
  }

  function handleEliminarProducto(e, idProducto) {
    Swal.fire({
      icon: "question",
      title: "Seguro que deseas eliminar el producto?",
      text: "Esto desabilitara en la pagina",
      showCancelButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        const token = localStorage.getItem("token");
        await dispatch(eliminarProducto(idProducto, token));
      }
    });
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerTodosLosProductos(token));
      } catch (e) {
        Swal.fire(
          "Hubo un problema",
          "Error al obtener los productos",
          "error"
        );
      }
      setLoading(false);
    })();
    return () => {
      dispatch(obtenerTodosLosProductos());
    };
  }, []);

  return (
    <div
      className={`${s.contenedorProductosCreados} ${
        loading ? s.loadingTrue : null
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <table className={s.tablaProductosCreados}>
          <thead>
            <tr className={s.encabezadoProductosCreados}>
              <th onClick={() => handleOrdernar("id")} className={s.cursor}>
                Id
              </th>
              <th onClick={() => handleOrdernar("name")} className={s.cursor}>
                Nombre
              </th>
              <th onClick={() => handleOrdernar("price")} className={s.cursor}>
                Precio
              </th>
              <th>Stock</th>
              <th>Descripción</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody className={s.bodyProductosCreados}>
            {productos.length > 0 ? (
              productos?.map((a) => {
                return (
                  <tr key={"listaProductos" + a.id}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.price}</td>
                    <th>{a.stock}</th>
                    <td>{a.description.substring(0, 20)}</td>
                    <td>
                      <div
                        className={s.botonEditarProducto}
                        onClick={(e) => handleEditarProducto(e, a)}
                      >
                        <AiFillEdit />
                      </div>
                    </td>
                    <td>
                      <div
                        className={s.botonEliminarProducto}
                        onClick={(e) => handleEliminarProducto(e, a.id)}
                      >
                        <AiFillDelete />
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
      {editarProducto && (
        <ModalModificarVenta
          producto={producto}
          editarProducto={editarProducto}
          setEditarProducto={setEditarProducto}
        />
      )}
    </div>
  );
}

export default ProductosCreados;

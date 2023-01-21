import React, { useEffect, useState } from "react";
import s from "./ProductosCreados.module.css";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import {
  ordenarProductos,
  eliminarProducto,
  obtenerTodosLosProductos,
  obtenerDetallesProductoDashboard,
} from "../../../../redux/actions/actionsDashboardAdmin";
import ModalModificarProducto from "./ModalModificarProducto/ModalModificarProducto";
import Loading from "../../../Loading/Loading";
import Swal from "sweetalert2";

import { PulseLoader } from "react-spinners";

function ProductosCreados() {
  const dispatch = useDispatch();
  const productos = useSelector((e) => e.general.productos);
  const [loading, setLoading] = useState(false);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);

  const [editarProducto, setEditarProducto] = useState(false);
  const [producto, setProducto] = useState({});

  const [cambioOrden, setCambioOrden] = useState(false);
  function handleOrdernar(columna) {
    dispatch(ordenarProductos(columna));
    setCambioOrden(!cambioOrden);
  }

  async function handleEditarProducto(e, prod) {
    setCargandoDetalles(true);
    try {
      setProducto(prod);
      const token = localStorage.getItem("token");
      await dispatch(obtenerDetallesProductoDashboard(prod.id, token));
      setEditarProducto(true);
    } catch (error) {
      Swal.fire("Hubo un problema!", "Puedes intertarlo nuevamente", "error");
      setProducto({});
    }
    setCargandoDetalles(false);
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
      dispatch(obtenerDetallesProductoDashboard());
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
              {/* <th>Stock</th> */}
              {/* <th>Descripción</th> */}
              <th>Destacado</th>
              <th>En oferta</th>
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
                    {/* <th>{a.stock}</th> */}
                    {/* <td>{a.description.substring(0, 20)}</td> */}
                    <td>{a.marked ? "Verdadero" : "Falso"}</td>
                    <td>{a.offSale ? "Verdadero" : "Falso"}</td>
                    <td>
                      <div
                        className={s.botonEditarProducto}
                        onClick={(e) => handleEditarProducto(e, a)}
                      >
                        {cargandoDetalles ? (
                          <PulseLoader color={"#f99716"} size="5px" />
                        ) : (
                          <AiFillEdit />
                        )}
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
        <ModalModificarProducto
          producto={producto}
          setProducto={setProducto}
          editarProducto={editarProducto}
          setEditarProducto={setEditarProducto}
        />
      )}
    </div>
  );
}

export default ProductosCreados;

import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Categorias.module.css";
import { obtenerCategorias } from "../../../../redux/actions/actionsShop";
import Loading from "../../../Loading/Loading";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalCategoria from "./ModalCategoria/ModalCategoria";
import Swal from "sweetalert2";
import { eliminarCategoria } from "../../../../redux/actions/actionsDashboardAdmin";

function Categorias({ usuario }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(false);
  const categorias = useSelector((e) => e.tienda.categorias);

  function handleEliminarCategoria(e, idCategoria) {
    Swal.fire({
      title: "Desea eliminar la categoria?",
      text: "La misma puede estar asociada a productos.",
      icon: "question",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        try {
          setLoading(true);
          const token = localStorage.getItem("token");
          await dispatch(eliminarCategoria(idCategoria, token));
          Swal.fire("Exito", "Categoria eliminada correctamente", "success");
        } catch (error) {
          Swal.fire("Hubo un problema", "Puedes volver a intentarlo", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(obtenerCategorias());
      setLoading(false);
    })();

    return () => {
      dispatch(obtenerCategorias("reset"));
    };
  }, []);

  return (
    <div
      className={`${s.contenedorCategoria} ${loading ? s.loadingTrue : false}`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <table className={s.tablaCategoria}>
            <thead>
              <tr className={s.encabezadoCategoria}>
                <th>Id</th>
                <th>Nombre</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody className={s.bodyCategoria}>
              {categorias.length > 0 ? (
                categorias?.map((a) => {
                  return (
                    <tr key={"listaCategorias" + a.id}>
                      <td>{a.id}</td>
                      <td>{a.name}</td>
                      <td>
                        <div
                          className={s.botonEditarCategoria}
                          onClick={(e) => {
                            setCategoriaSeleccionada(a);
                            setMostrarModal(true);
                          }}
                        >
                          <AiFillEdit />
                        </div>
                      </td>
                      <td>
                        <div
                          className={s.botonEliminarCategoria}
                          onClick={(e) => handleEliminarCategoria(e, a.id)}
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
                  <td className={s.renglonVacio}>Sin datos</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>

          <div
            className={s.contenedorBoton}
            onClick={() => {
              setMostrarModal(true);
            }}
          >
            <div className={s.boton}>Crear categoria</div>
          </div>

          {mostrarModal ? (
            <ModalCategoria
              categoria={categoriaSeleccionada}
              setCategoriaSeleccionada={setCategoriaSeleccionada}
              setMostrarModal={setMostrarModal}
            />
          ) : (
            false
          )}
        </>
      )}
    </div>
  );
}

export default Categorias;

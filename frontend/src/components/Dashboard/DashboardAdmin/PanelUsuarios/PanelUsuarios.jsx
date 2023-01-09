import React, { useEffect, useState } from "react";
import s from "./PanelUsuarios.module.css";

import { useSelector, useDispatch } from "react-redux";
import DetallesUsuario from "./DetallesUsuario/DetallesUsuario";
import Loading from "../../../Loading/Loading";
import { CgDetailsMore } from "react-icons/cg";
import {
  ordenarUsuarios,
  obtenerUsuarios,
  modificarRolUsuario,
} from "../../../../redux/actions/actionsDashboardAdmin";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";

function PanelUsuarios({ usuario }) {
  const dispatch = useDispatch();
  const usuarios = useSelector((e) => e.general.usuarios);
  const [mostrarDetallesUsuario, setMostrarDetallesUsuario] = useState(false);
  const [idUsuario, setIdUsuario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [idSelect, setIdSelect] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerUsuarios(token));
      } catch (e) {
        Swal.fire("Error", "No se pudieron obtener los usuario", "error");
      }
      setLoading(false);
    })();
  }, []);

  const [cambioOrden, setCambioOrden] = useState(false);
  async function handleOrdenarUsuarios(columna) {
    await dispatch(ordenarUsuarios(columna));
    setCambioOrden(!cambioOrden);
  }

  async function handleComprasUsuario(e, id) {
    setMostrarDetallesUsuario(!mostrarDetallesUsuario);
    setIdUsuario(id);
  }

  function handleCambiarRolUsuario(e, id) {
    setIdSelect(e.target.id);
    setActualizando(true);
    Swal.fire({
      title: "Cambiando rol usuario",
      text: "Confirma cambiar el rol del usuario?",
      icon: "question",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      try {
        if (isConfirmed) {
          const token = localStorage.getItem("token");
          await dispatch(modificarRolUsuario(id, e.target.value, token));
        } else {
          e.target.value = e.target.value === "admin" ? "user" : "admin";
        }
      } catch (error) {
        Swal.fire(
          "Error al cambiar el rol de usuario",
          "Intentalo nuevamente mas tarde",
          "error"
        );
      }
      setIdSelect(false);
      setActualizando(false);
    });
  }

  return (
    <div
      className={`${s.contenedorPanelUsuarios} ${
        loading ? s.loadingTrue : null
      }`}
    >
      {loading ? (
        <Loading />
      ) : (
        <table className={s.tablaPanelUsuarios}>
          <thead>
            <tr className={s.encabezadoPanelUsuarios}>
              <th
                onClick={() => handleOrdenarUsuarios("id")}
                className={s.cursor}
              >
                Id
              </th>
              <th
                onClick={() => handleOrdenarUsuarios("username")}
                className={s.cursor}
              >
                Username
              </th>
              <th
                onClick={() => handleOrdenarUsuarios("email")}
                className={s.cursor}
              >
                E-mail
              </th>
              <th
                onClick={() => handleOrdenarUsuarios("role")}
                className={s.cursor}
              >
                Rol
              </th>
              <th>Ver detalles</th>
            </tr>
          </thead>
          {usuarios.length ? (
            <tbody className={s.bodyPanelUsuarios}>
              {usuarios?.map((a) => {
                return (
                  <tr key={"comprasUsuario" + a.id}>
                    <td>{a.id}</td>
                    <td>{a.username}</td>
                    <td>{a.email}</td>
                    <td onChange={(e) => handleCambiarRolUsuario(e, a.id)}>
                      {actualizando && `${a.id}` === `${idSelect}` ? (
                        <div className={s.contenedorSpinnerSelect}>
                          <PulseLoader color="orange" size="12px" />
                        </div>
                      ) : usuario.role === "superAdmin" &&
                        a.role !== "superAdmin" ? (
                        <select name="rol" id={a.id} defaultValue={a.role}>
                          <option value="admin">admin</option>
                          <option value="user">user</option>
                        </select>
                      ) : usuario.role === "superAdmin" &&
                        a.role === "superAdmin" ? (
                        "superAdmin"
                      ) : (
                        a.role
                      )}
                    </td>
                    <td>
                      <div
                        className={s.botonComprasUsuario}
                        onClick={(e) => handleComprasUsuario(e, a.id)}
                      >
                        <CgDetailsMore />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td className={s.renglonVacio}>Sin datos</td>
                <td></td>
              </tr>
            </tbody>
          )}
        </table>
      )}

      {mostrarDetallesUsuario && (
        <DetallesUsuario
          mostrarDetallesUsuario={mostrarDetallesUsuario}
          setMostrarDetallesUsuario={setMostrarDetallesUsuario}
          idUsuario={idUsuario}
          setIdUsuario={setIdUsuario}
        />
      )}
    </div>
  );
}

export default PanelUsuarios;

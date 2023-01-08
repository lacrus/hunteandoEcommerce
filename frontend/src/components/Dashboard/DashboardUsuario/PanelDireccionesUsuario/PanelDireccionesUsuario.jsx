import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./PanelDireccionesUsuario.module.css";
import Swal from "sweetalert2";
import {
  crearDireccionUsuario,
  modificarrDireccionUsuario,
  obtenerDireccionesUsuario,
} from "../../../../redux/actions/actionsDashboardClient";
import { CgDetailsMore, CgMathPlus } from "react-icons/cg";
import ModalDireccion from "./ModalDireccion/ModalDireccion";
import resizeHook from "../../../../hooks/resizeHook";

function PanelDireccionesUsuario({ token, usuario }) {
  const [cargando, setCargando] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [mostrarModalDireccion, setMostrarModalDireccion] = useState(false);
  const [direccion, setDireccion] = useState({});
  const direcciones = useSelector((e) => e.direccionesUsuario);

  const anchoPantalla = resizeHook().width;

  async function handleCrearDireccion(e, id) {
    console.log(e, id);
    Swal.fire({
      icon: "question",
      title: `${
        mostrarModalDireccion === "nuevaDireccion" ? "Creando " : "Modificando "
      } dirección`,
      text: "Seguro desea continuar?",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        setLoading(true);
        try {
          if (mostrarModalDireccion === "nuevaDireccion") {
            await dispatch(crearDireccionUsuario(usuario.id, e, token));
          } else {
            await dispatch(modificarrDireccionUsuario(usuario.id, e, token));
          }
          setMostrarModalDireccion(false);
          setDireccion({});
        } catch (e) {
          Swal.fire(
            `Error al ${
              mostrarModalDireccion === "nuevaDireccion" ? "crear" : "modificar"
            } dirección`,
            "Intenta nuevamente mas tarde",
            "error"
          );
        }
        setLoading(false);
      }
    });
  }

  function handleModalDireccion(queHacer, direccion) {
    if (queHacer === "nuevaDireccion") {
      setMostrarModalDireccion("nuevaDireccion");
      setDireccion({});
    } else {
      setMostrarModalDireccion("modificarDireccion");
      setDireccion(direccion);
    }
  }

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        await dispatch(obtenerDireccionesUsuario(usuario.id, token));
      } catch (e) {
        Swal.fire(
          "Error al cargar las direcciones",
          "Intenta nuevamente mas tarde",
          "error"
        );
      }
      setCargando(false);
    })();
  }, []);

  return (
    <div className={s.contenedorPanelDireccionesUsuario}>
      {direcciones?.length ? (
        <>
          <div className={s.tituloPanelDireccionesUsuario}>Mis direcciones</div>
          <table className={s.tablaPanelDireccionesUsuario}>
            <thead>
              <tr className={s.encabezadoPanelDireccionesUsuario}>
                <th>Calle</th>
                {anchoPantalla > 320 ? <th>Número</th> : null}
                <th>Ciudad</th>
                {anchoPantalla > 450 ? <th>Provincia</th> : null}
                <th>Modificar</th>
              </tr>
            </thead>

            <tbody className={s.bodyPanelDireccionesUsuario}>
              {direcciones.map((i, idx) => {
                return (
                  <tr key={"direccion" + idx}>
                    <th>{i.street}</th>
                    {anchoPantalla > 320 ? <th>{i.number}</th> : null}
                    <th>{i.city}</th>
                    {anchoPantalla > 450 ? <th>{i.province}</th> : null}
                    <td>
                      <div
                        className={s.botonPanelDireccionesUsuario}
                        onClick={() =>
                          handleModalDireccion("modificarDireccion", i)
                        }
                      >
                        <CgDetailsMore />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {direcciones.length < 5 ? (
                <tr>
                  <th></th>
                  {anchoPantalla > 320 ? <th></th> : null}
                  {anchoPantalla > 450 ? <th></th> : null}
                  <th>CREAR DIRECCIÓN</th>
                  <td>
                    <div
                      className={s.botonPanelDireccionesUsuario}
                      onClick={() =>
                        handleModalDireccion("nuevaDireccion", {})
                      }
                    >
                      <CgMathPlus />
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div
            style={{ marginTop: "5vh" }}
            className={s.tituloPanelDireccionesUsuario}
          >
            Mis direcciones
          </div>
          <div
            className={s.contenedorCrearDireccion}
            onClick={() => handleModalDireccion("nuevaDireccion", {})}
          >
            <div className={s.tituloCrearDireccion}>
              Crea tu primera direccion
            </div>
            <CgMathPlus className={s.signoMas} />
          </div>
        </>
      )}
      {mostrarModalDireccion ? (
        <ModalDireccion
          token={token}
          usuario={usuario}
          handleCrearDireccion={handleCrearDireccion}
          direccion={direccion}
          setMostrarModalDireccion={setMostrarModalDireccion}
          mostrarModalDireccion={mostrarModalDireccion}
          setDireccion={setDireccion}
        />
      ) : null}
    </div>
  );
}

export default PanelDireccionesUsuario;

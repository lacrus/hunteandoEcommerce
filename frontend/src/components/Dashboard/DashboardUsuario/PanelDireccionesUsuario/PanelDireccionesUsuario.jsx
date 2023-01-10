import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./PanelDireccionesUsuario.module.css";
import Swal from "sweetalert2";
import { obtenerDireccionesUsuario } from "../../../../redux/actions/actionsDashboardClient";
import { CgDetailsMore } from "react-icons/cg";
import ModalDireccion from "./ModalDireccion/ModalDireccion";
import resizeHook from "../../../../hooks/resizeHook";
import Loading from "../../../Loading/Loading";

function PanelDireccionesUsuario({ token, usuario }) {
  const [cargando, setCargando] = useState(false);
  const dispatch = useDispatch();
  const [mostrarModalDireccion, setMostrarModalDireccion] = useState(false);
  const [direccion, setDireccion] = useState({});
  const direcciones = useSelector((e) => e.general.direccionesUsuario);

  const anchoPantalla = resizeHook().width;

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
        console.log(e)
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
      <div className={s.tituloPanelDireccionesUsuario}>Mis direcciones</div>
      {cargando ? (
        <Loading />
      ) : (
        <>
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
              {direcciones?.map((i, idx) => {
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
            </tbody>
          </table>

          {direcciones?.length < 5 ? (
            <div
              className={s.crearNuevaDireccion}
              onClick={() => handleModalDireccion("nuevaDireccion", {})}
            >
              <div className={s.crearNuevaDireccionTexto}>Crear direccion</div>
            </div>
          ) : null}

          {mostrarModalDireccion ? (
            <ModalDireccion
              token={token}
              usuario={usuario}
              direccion={direccion}
              setMostrarModalDireccion={setMostrarModalDireccion}
              mostrarModalDireccion={mostrarModalDireccion}
              setDireccion={setDireccion}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default PanelDireccionesUsuario;

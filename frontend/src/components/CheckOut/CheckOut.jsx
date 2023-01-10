import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import s from "./CheckOut.module.css";
import Swal from "sweetalert2";
import { obtenerDireccionesUsuario } from "../../redux/actions/actionsDashboardClient";
import PanelLateralUsusario from "../Dashboard/DashboardUsuario/PanelLateralUsusario/PanelLateralUsusario";
import { ClipLoader } from "react-spinners";
import ModalDireccion from "../Dashboard/DashboardUsuario/PanelDireccionesUsuario/ModalDireccion/ModalDireccion";
import { CgDetailsMore } from "react-icons/cg";
import resizeHook from "../../hooks/resizeHook";
import { compraConML } from "../../redux/actions/actionsShop";

function CheckOut({ usuario }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");
  const anchoPantalla = resizeHook().width;

  const direccionesUsuario = useSelector((e) => e.general.direccionesUsuario);
  const carrito = useSelector((e) => e.carro.carro);

  const [loading, setLoading] = useState(false);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(false);
  const [direccion, setDireccion] = useState({});
  const [mostrarModalDireccion, setMostrarModalDireccion] = useState(false);

  function handleSeleccionarDireccion(e) {
    setDireccionSeleccionada(e.target.id);
  }

  function handleModificarDireccion(accion, direccion) {
    setDireccion(direccion);
    setMostrarModalDireccion(accion);
  }

  async function handleAvanzarCompra(e) {
    if (direccionSeleccionada) {
      try {
        setLoading(true);
        carrito.shippingAddress = direccionSeleccionada;
        const respuestaPago = await dispatch(
          compraConML(usuario.id, carrito, token)
        );
        console.log("respuestapago", respuestaPago.init_point);
        window.location.replace(`${respuestaPago.init_point}`);
        setLoading(false);
      } catch (error) {
        Swal.fire("Hubo un problema!", "Intenta nuevamente mas tarde", "error");
      }
    } else {
      Swal.fire("Ups!", "Primero selecciona una dirección de envio", "warning");
    }
  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        await dispatch(obtenerDireccionesUsuario(usuario.id, token));
      } catch (e) {
        Swal.fire(
          "Hubo un problema",
          "Vuelve a intentarlo mas tarde",
          "error"
        ).then(() => {
          navigate("/carrito");
        });
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className={s.contenedorCheckOut}>
      {loading ? (
        <div className={`${s.contenedorLoading} ${s.sombra}`}>
          <ClipLoader />
        </div>
      ) : direccionesUsuario?.length ? (
        <div className={`${s.contenedorDirecciones} ${s.sombra}`}>
          <div className={s.tituloDireccion}>
            Selecciona una dirección de envío
          </div>
          {direccionesUsuario?.map((i) => {
            return (
              <div
                key={i.id}
                id={i.id}
                className={`${s.contenedorDireccion} ${s.sombra}`}
                onClick={handleSeleccionarDireccion}
              >
                <input
                  type="radio"
                  // id="huey"
                  id={i.id}
                  name="direccion"
                  value={i.id}
                  checked={direccionSeleccionada == i.id ? true : false}
                />
                <div className={s.contenedorDetalle}>
                  <div id={i.id} className={s.tituloDetalle}>
                    Calle
                  </div>
                  <label id={i.id} for={i.id}>
                    {i.street + " " + i.number}
                  </label>
                </div>
                <div className={s.contenedorDetalle}>
                  <div id={i.id} className={s.tituloDetalle}>
                    Ciudad
                  </div>
                  <div id={i.id}>{i.city}</div>
                </div>

                {anchoPantalla > 1000 ? (
                  <div className={s.contenedorDetalle}>
                    <div id={i.id} className={s.tituloDetalle}>
                      CP
                    </div>
                    <div id={i.id}>{i.zipCode}</div>
                  </div>
                ) : null}

                {anchoPantalla > 700 ? (
                  <div className={s.contenedorDetalle}>
                    <div id={i.id} className={s.tituloDetalle}>
                      Provincia
                    </div>
                    <div id={i.id}>{i.province}</div>{" "}
                  </div>
                ) : null}

                {anchoPantalla > 800 ? (
                  <div className={s.contenedorDetalle}>
                    <div id={i.id} className={s.tituloDetalle}>
                      Nº contacto
                    </div>
                    <div id={i.id}>{i.contact || "Sin contacto"}</div>{" "}
                  </div>
                ) : null}
                {anchoPantalla > 1000 ? (
                  <div className={s.contenedorDetalle}>
                    <div id={i.id} className={s.tituloDetalle}>
                      Detalles
                    </div>
                    <div id={i.id}>
                      {i.detail
                        ? i.detail?.slice(0, 10) + "..."
                        : "Sin detalles"}
                    </div>
                  </div>
                ) : null}

                <div
                  className={`${s.contenedorDetalle} ${s.detalleModificar}`}
                  onClick={() => {
                    handleModificarDireccion("modificarDireccion", i);
                  }}
                >
                  <div className={`${s.tituloDetalle}`}>Modificar</div>
                  <CgDetailsMore color="orange" />
                </div>
              </div>
            );
          })}
          {direccionesUsuario.length < 5 ? (
            <div
              className={s.crearNuevaDireccion}
              onClick={() => handleModificarDireccion("nuevaDireccion", {})}
            >
              <div className={s.crearNuevaDireccionTexto}>
                Agregar nueva direccion
              </div>
            </div>
          ) : null}

          <div
            className={`${s.crearNuevaDireccion} ${s.botonMP}`}
            onClick={handleAvanzarCompra}
          >
            <div className={s.crearNuevaDireccionTexto}>
              Avanzar al pago con MERCADOPAGO
            </div>
          </div>
        </div>
      ) : (
        <div className={`${s.contenedorDirecciones} ${s.sombra}`}>
          <div className={s.tituloDireccion}>Dirección de envío</div>
          <div className={s.subTituloDireccion}>Aun no posees direcciones!</div>
          <div className={s.subTituloDireccion}>
            Crea una para poder continuar
          </div>

          {direccionesUsuario.length < 5 ? (
            <div
              className={s.crearNuevaDireccion}
              onClick={() => handleModificarDireccion("nuevaDireccion", {})}
            >
              <div className={s.crearNuevaDireccionTexto}>
                Agregar nueva direccion
              </div>
            </div>
          ) : null}
        </div>
      )}
      {mostrarModalDireccion && direccionesUsuario.length < 5 ? (
        <ModalDireccion
          token={token}
          usuario={usuario}
          direccion={direccion}
          setDireccion={setDireccion}
          setMostrarModalDireccion={setMostrarModalDireccion}
          mostrarModalDireccion={mostrarModalDireccion}
        />
      ) : null}
    </div>
  );
}

export default CheckOut;

import React, { useState } from "react";
import s from "./PanelPerfilUsuario.module.css";

import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { modificarUsuario } from "../../../../redux/actions/actionsDashboardClient";
import { recuperarContrasena } from "../../../../redux/actions/actionsLogin";

YupPassword(Yup);

function PanelPerfilUsuario({ token, usuario }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(e) {
    Swal.fire({
      title: "Cambiando datos usuario",
      text: "Confirma modificar los datos?",
      icon: "question",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      if (e.nombre.length || e.apellido.length) {
        setLoading(true);
        try {
          if (isConfirmed) {
            await dispatch(modificarUsuario(usuario.id, e, token));
          }
        } catch (e) {
          Swal.fire("Hubo un problema", "Vuelve a intentar mas tarde", "error");
        }
        setLoading(false);
      }
    });
  }

  const initialValues = {
    nombre: usuario?.firstname || "",
    apellido: usuario?.lastname || "",
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string().max(20, "*El nombre debe tener máximo 20 carácteres"),
    apellido: Yup.string().max(
      15,
      "*El apellido debe tener máximo 15 carácteres"
    ),
  });
  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    touched,
    handleBlur,
    resetForm,
  } = formik;

  function handleCambioContrasena() {
    if (usuario.createdIn !== "local") {
      Swal.fire(
        "Imposible cambiar contraseña",
        "Tu cuenta no se creo localmente",
        "warning"
      );
    } else {
      try {
        Swal.fire({
          title: "Deseas cambiar la contraseña?",
          text: "Te enviaremos un link al mail registrado.",
          icon: "question",
          showDenyButton: true,
          footer: "El link expira en 30 minutos.",
        }).then(async ({ isConfirmed }) => {
          if (isConfirmed) {
            await dispatch(recuperarContrasena(usuario.email));
            Swal.fire("Revisa tu casilla de mail", "", "success");
          }
        });
      } catch (error) {
        Swal.fire("Hubo un problema", "Vuelve a intentarlo mas tarde", "error");
      }
    }
  }

  return (
    <div className={s.contenedorPanelPerfilUsuario}>
      <form className={s.formPanelUsuario} onSubmit={handleSubmit}>
        <div className={s.tituloPanelUsuario}>Mis datos</div>
        <div className={s.renglonNombreApellido}>
          <div className={s.divInputLabel}>
            <label
              className={`${s.labelForm} ${
                touched.nombre && errors.nombre ? s.errorColor : undefined
              }`}
              htmlFor="nombre"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              className={`${s.inputRegistro} ${
                touched.nombre && errors.nombre ? s.error : undefined
              }`}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nombre}
            />
            {touched.nombre && errors.nombre && (
              <div className={`${s.errorColor} ${s.msjError}`}>
                {errors.nombre}
              </div>
            )}
          </div>

          
          <div className={s.divInputLabel}>
            <label
              className={`${s.labelForm} ${
                touched.apellido && errors.apellido ? s.errorColor : undefined
              }`}
              htmlFor="apellido"
            >
              Apellido
            </label>
            <input
              id="apellido"
              name="apellido"
              className={`${s.inputRegistro} ${
                touched.apellido && errors.apellido ? s.error : undefined
              }`}
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.apellido}
            />
            {touched.apellido && errors.apellido && (
              <div className={`${s.errorColor} ${s.msjError}`}>
                {errors.apellido}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className={s.contenedorSpinnerBoton}>
            <PulseLoader color="orange" />
          </div>
        ) : (
          <button className={s.botonRegistrarse} type="submit">
            Modificar datos
          </button>
        )}
      </form>

      <form className={s.formPanelUsuario}>
        <div className={s.divInputLabel} style={{ width: "fit-content" }}>
          <label
            className={`${s.labelForm} ${
              null
              // touchedMail.email && errorsMail.email ? s.errorColor : undefined
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            className={`${s.inputRegistro} ${
              null
              // touchedMail.email && errorsMail.email ? s.error : undefined
            }`}
            type="email"
            onChange={null}
            onBlur={null}
            value={usuario?.email}
          />
          {/* {touched.email && errors.email && (
            <div className={`${s.errorColor} ${s.msjError}`}>
              {errors.email}
            </div>
          )} */}
        </div>

        {loading ? (
          <div className={s.contenedorSpinnerBoton}>
            <PulseLoader color="orange" />
          </div>
        ) : (
          <button
            className={`${s.botonRegistrarse} ${s.botonRecuperoContrasena}`}
            onClick={handleCambioContrasena}
            type="button"
          >
            Solicitar cambio contraseña
          </button>
        )}
      </form>
    </div>
  );
}

export default PanelPerfilUsuario;

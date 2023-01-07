import React, { useState } from "react";
import s from "./PanelPerfilUsuario.module.css";

import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import modificarUsuario from "../../../../redux/actions/actionsDashboardClient";

YupPassword(Yup);

function PanelPerfilUsuario({ token, usuario }) {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function onSubmit(e) {
    Swal.fire({
      title: "Cambiando datos usuario",
      text: "Confirma modificar los datos?",
      icon: "question",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      setLoading(true);
      try {
        if (isConfirmed) {
          await dispatch(modificarUsuario(usuario.id, e, token));
        }
      } catch (e) {
        Swal.fire("Hubo un problema", "Vuelve a intentar mas tarde", "error");
      }
      setLoading(false);
    });
  }

  const initialValues = {
    nombre: usuario?.firstname || "",
    apellido: usuario?.lastname || "",
    email: usuario?.email || "",
    contrasena: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("*Ingrese un mail valido"),
    // .required("*Campo obligatorio"),
    contrasena: Yup.string()
      .min(6, "*La contraseña debe tener mínimo 6 caracteres")
      .max(18, "*La contraseña debe tener máximo 18 carácteres")
      .minUppercase(1, "*La contraseña debe tener al menos 1 mayúscula")
      .minLowercase(1, "*La contraseña debe tener al menos 1 minúscula")
      .minNumbers(1, "*La contraseña debe tener al menos 1 número"),
    // .required("*Campo obligatorio"),
    nombre: Yup.string().max(20, "*El nombre debe tener máximo 20 carácteres"),
    // .required("*Campo obligatorio"),
    apellido: Yup.string().max(
      15,
      "*El apellido debe tener máximo 15 carácteres"
    ),
    // .required("*Campo obligatorio"),
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
        <div className={s.divInputLabel}>
          <label
            className={`${s.labelForm} ${
              touched.email && errors.email ? s.errorColor : undefined
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            className={`${s.inputRegistro} ${
              touched.email && errors.email ? s.error : undefined
            }`}
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {touched.email && errors.email && (
            <div className={`${s.errorColor} ${s.msjError}`}>
              {errors.email}
            </div>
          )}
        </div>

        <div className={s.divInputLabel}>
          <div className={s.divMostrarContrasena}>
            <label
              className={`${s.labelForm} ${
                touched.contrasena && errors.contrasena
                  ? s.errorColor
                  : undefined
              }`}
              htmlFor="password"
            >
              Contraseña
            </label>

            <div
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              className={s.renglonMostrarContrasena}
            >
              {mostrarContrasena ? (
                <AiFillEyeInvisible className={s.iconoMostrarContrasena} />
              ) : (
                <AiFillEye className={s.iconoMostrarContrasena} />
              )}
              <p className={s.textoMostrarContrasena}>
                {mostrarContrasena ? "    Ocultar" : "    Mostrar"}
              </p>
            </div>
          </div>

          <input
            id="password"
            name="contrasena"
            className={`${s.inputRegistro} ${
              touched.contrasena && errors.contrasena ? s.error : undefined
            }`}
            type={mostrarContrasena ? "text" : "password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contrasena}
          />
          {touched.contrasena && errors.contrasena && (
            <div className={`${s.errorColor} ${s.msjError}`}>
              {errors.contrasena}
            </div>
          )}
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
    </div>
  );
}

export default PanelPerfilUsuario;

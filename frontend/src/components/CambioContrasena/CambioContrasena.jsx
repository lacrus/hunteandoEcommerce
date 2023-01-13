import React, { useState } from "react";
import s from "./CambioContrasena.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { cambiarContrasena } from "../../redux/actions/actionsLogin";
YupPassword(Yup);

function CambioContrasena() {
  const [loading, setLoading] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  async function onSubmit(e) {
    setLoading(true);
    try {
      const respuesta = await dispatch(cambiarContrasena(e.contrasena, token));
      if (respuesta.success === true) navigate("/");
    } catch (error) {
      Swal.fire(
        "Error al cambiar la contraseña",
        "Intenta nuevamente mas tarde",
        "error"
      );
    }
    setLoading(false);
  }

  const initialValues = {
    contrasena: "",
    contrasena2: "",
  };

  const validationSchema = Yup.object().shape({
    contrasena: Yup.string()
      .min(6, "La contraseña debe tener mínimo 6 caracteres")
      .max(18, "La contraseña debe tener máximo 18 carácteres")
      .minUppercase(1, "La contraseña debe tener al menos 1 mayúscula")
      .minLowercase(1, "La contraseña debe tener al menos 1 minúscula")
      .minNumbers(1, "La contraseña debe tener al menos 1 número")
      .required("*Campo obligatorio"),
    contrasena2: Yup.string()
      .oneOf([Yup.ref("contrasena"), null], "*Las contraseñas no coinciden")
      .required("*Campo obligatorio"),
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
    <div className={s.contenedorCambioContrasena}>
      <form className={s.contenedorForm} onSubmit={handleSubmit}>
        <h1 className={s.titulo}>Cambiar contraseña</h1>
        <div className={s.divInputLabel}>
          <div className={s.divMostrarContrasena}>
            <label
              className={`${s.label} ${
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
            className={`${s.input} ${
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

        <div className={s.divInputLabel}>
          <label
            className={`${s.label} ${
              touched.contrasena2 && errors.contrasena2
                ? s.errorColor
                : undefined
            }`}
            htmlFor="contrasena2"
          >
            Repite la contraseña
          </label>
          <input
            id="contrasena2"
            name="contrasena2"
            className={`${s.input} ${
              touched.contrasena2 && errors.contrasena2 ? s.error : undefined
            }`}
            type={mostrarContrasena ? "text" : "password"}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.contrasena2}
          />
          {touched.contrasena2 && errors.contrasena2 && (
            <div className={`${s.errorColor} ${s.msjError}`}>
              {errors.contrasena2}
            </div>
          )}
        </div>

        {!loading ? (
          <button className={s.botonCambiarContrasena} type="submit">
            Cambiar contraseña
          </button>
        ) : (
          <div className={s.contenedorLoadingBoton}>
            <ClipLoader />
          </div>
        )}
      </form>
    </div>
  );
}

export default CambioContrasena;

import React, { useState } from "react";
// import { Copyright } from "../../utils/utils";
import logoGoogle from "../../assets/images/logoGoogle.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import s from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  iniciarSesion,
  logearToken,
  recuperarContrasena,
} from "../../redux/actions/actionsLogin";
import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";
import { obtenerCarrito } from "../../redux/actions/actionsCart";
import { useEffect } from "react";
import axios from "axios";

YupPassword(Yup);

export default function Login() {
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [cambioContraseña, setCambioContraseña] = useState(false);
  const [mailEnviado, setMailEnviado] = useState(false);

  async function handleCambiarContrasena() {
    if (!values.email || errors.email) {
      touched.email = true;
      errors.email = "*Campo obligatorio";
      setCambioContraseña(!cambioContraseña);
      Swal.fire(
        "Ingresa tu email",
        "Te enviaremos un mail para la recuperación",
        "info"
      );
    } else {
      if (mailEnviado) {
        Swal.fire("Ya se te envio el mail", "Revisa tu correo", "warning");
      } else {
        try {
          setMailEnviado(true);
          dispatch(recuperarContrasena(values.email));
          Swal.fire({
            title: "Revisa tu mail!",
            text: "Si estas registrado te enviaremos la recuperación.",
            icon: "success",
            footer: "El link expira en 30 minutos.",
          });
        } catch (error) {
          Swal.fire(
            "Hubo un problema!",
            "Vuelve a intentarlo mas tarde..",
            "error"
          );
        }
      }
    }
  }
  async function onSubmit(e) {
    setLoading(true);
    try {
      const registro = await dispatch(iniciarSesion(e));
      await dispatch(obtenerCarrito(registro.payload.id, registro.token));
      if (params.id !== undefined) {
        navigate(`/tienda/detalles/${params.id}`);
      } else {
        if (registro.success === true) {
          navigate("/");
        } else {
          Swal.fire(registro.mensaje, "", "error");
        }
      }
    } catch (error) {
      Swal.fire(
        "Error al iniciar sesión",
        "Intenta nuevamente mas tarde",
        "error"
      );
    }
    setLoading(false);
  }

  const initialValues = {
    email: "",
    contrasena: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("*Ingrese un mail valido")
      .required("*Campo obligatorio"),
    contrasena: Yup.string()
      .min(6, "La contraseña debe tener mínimo 6 caracteres")
      .max(18, "La contraseña debe tener máximo 18 carácteres")
      .minUppercase(1, "La contraseña debe tener al menos 1 mayúscula")
      .minLowercase(1, "La contraseña debe tener al menos 1 minúscula")
      .minNumbers(1, "La contraseña debe tener al menos 1 número")
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

  useEffect(() => {
    if (params.token) {
      (async () => {
        const dataUser = await dispatch(logearToken(params.token));
        await dispatch(obtenerCarrito(dataUser.payload.id, params.token));
        navigate("/");
      })();
    }
  }, []);

  return (
    <div className={s.contenedorGeneralLogin}>
      <div className={s.contenedorLogin}>
        <div className={s.contenedorIzquierdo}>
          <h1 className={s.tituloIniciarSesion}>Iniciar sesión</h1>
          <div
            onClick={() => {
              window.open(
                `${axios.defaults.baseURL}/auth/login/google`,
                "_self"
              );
            }}
            className={s.contenedorLogeoGoogle}
          >
            <img src={logoGoogle} alt="logo Google" className={s.logoGoogle} />
            <p className={s.tituloGoogle}>Continuar con Google</p>
          </div>
          <p className={s.renglonSeparador}>
            ---------- o Inicie con su Email ----------
          </p>
          <form className={s.contenedorFormLogin} onSubmit={handleSubmit}>
            <div className={s.divInputLabel}>
              <label
                className={`${s.labelLogin} ${
                  touched.email && errors.email ? s.errorColor : undefined
                }`}
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                className={`${s.inputLogin} ${
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
                  className={`${s.labelLogin} ${
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
                className={`${s.inputLogin} ${
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
            <div
              className={s.recuperarContrasena}
              onClick={handleCambiarContrasena}
            >
              ¿Olvido la contraseña?
            </div>

            {!loading ? (
              <button className={s.botonIniciarSesion} type="submit">
                Iniciar Sesión
              </button>
            ) : (
              <div className={s.contenedorLoadingBoton}>
                <ClipLoader />
              </div>
            )}
          </form>

          <div className={s.renglonLinkIniciarSesion}>
            <p>¿No está registrado? </p>
            <Link to="/registrarse" className={s.linkIniciarSesion}>
              Cree una cuenta nueva.
            </Link>
          </div>
          {/* <Copyright /> */}
        </div>
        <div className={s.contenedorImagenLogin} />
      </div>
    </div>
  );
}

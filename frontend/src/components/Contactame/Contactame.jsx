import React from "react";
import s from "./Contactame.module.css";
import InputFormulario from "../../ui/InputFormulario/InputFormulario";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import TextAreaInput from "../../ui/TextAreaInput/TextAreaInput";
import { mandarMailContactame } from "../../redux/actions";

let emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Contactame() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  };

  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .max(20, "*El nombre debe tener máximo 20 carácteres")
      .required("*Campo requerido"),
    email: Yup.string()
      .test("is-decimal", "*Ingresa un e-mail valido", (val) => {
        if (val != undefined) {
          return emailValidator.test(val);
        }
        return true;
      })
      .required("*Campo requerido"),
    asunto: Yup.string()
      .max(150, "*El asunto debe tener máximo 100 carácteres")
      .required("*Campo requerido"),
    mensaje: Yup.string()
      .max(500, "*El mensaje debe tener máximo 500 carácteres")
      .required("*Campo requerido"),
  });

  async function onSubmit(e) {
    setLoading(true);
    try {
      await dispatch(mandarMailContactame(e));
      Swal.fire(
        "Gracias por tu contacto!",
        "En breve responderemos tu email",
        "success"
      );
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Hubo un error..",
        text: "Puedes intentar nuevamente!",
      });
    }
    setLoading(false);
  }

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
    <div className={s.contenedorContactame}>
      <form className={s.formContactame} onSubmit={handleSubmit}>
        <div className={s.formRenglon}>
          <div className={s.inputFormRenglon}>
            <InputFormulario
              label={"Nombre"}
              placeholder="Ingresa tu nombre"
              tipo="text"
              onChange={handleChange}
              value={values.nombre}
              estiloError={touched.nombre && errors.nombre && true}
              name="nombre"
              id={"nombre"}
              mostrarError={touched.nombre && errors.nombre && true}
              msjError={errors.nombre}
              onBlur={handleBlur}
              estilos={s.inputInRow}
              estilosLabel={s.labelInput}
            />
          </div>
          <div className={s.inputFormRenglon}>
            <InputFormulario
              label={"E-mail"}
              placeholder="Ingresa tu e-mail"
              tipo="email"
              onChange={handleChange}
              value={values.email}
              estiloError={touched.email && errors.email && true}
              name="email"
              id={"email"}
              mostrarError={touched.email && errors.email && true}
              msjError={errors.email}
              onBlur={handleBlur}
              estilos={s.inputInRow}
              estilosLabel={s.labelInput}
              //   rows={rows}
            />
          </div>
        </div>
        <InputFormulario
          label={"Asunto"}
          placeholder="Ej: Cuando volveras a exponer!?"
          tipo="text"
          onChange={handleChange}
          value={values.asunto}
          estiloError={touched.asunto && errors.asunto && true}
          name="asunto"
          id={"asunto"}
          mostrarError={touched.asunto && errors.asunto && true}
          msjError={errors.email}
          onBlur={handleBlur}
          estilos={s.input}
          estilosLabel={s.labelInput}
          //   rows={rows}
        />
        <TextAreaInput
          id={"mensaje"}
          placeholder={"Ingresa tu mensaje"}
          name={"mensaje"}
          rows={10}
          value={values.mensaje}
          onBlur={handleBlur}
          onChange={handleChange}
          estiloError={touched.mensaje && errors.mensaje && true}
          mostrarError={touched.mensaje && errors.mensaje && true}
          msjError={errors.mensaje}
          estilosLabel={s.labelInput}
        />
        {!loading ? (
          <button className={s.botonEnviar} type="submit">
            Enviar Mail
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

export default Contactame;

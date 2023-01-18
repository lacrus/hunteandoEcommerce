import React, { useState } from "react";
import s from "./ModalCategoria.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormulario from "../../../../../ui/InputFormulario/InputFormulario";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";
import {
  crearCategoria,
  modificarCategoria,
} from "../../../../../redux/actions/actionsDashboardAdmin";
import { useDispatch } from "react-redux";

function ModalCategoria({ categoria, setCategoriaSeleccionada, setMostrarModal }) {
  const dispatch = useDispatch();
  const [cargando, setCargando] = useState(false);

  function handleBotonCerrar(e) {
    if (e.target.id === "botonCerrar" || e.target.id === "fondoModal") {
      Swal.fire({
        icon: "question",
        title: `Seguro deseas cancelar la ${
          categoria ? "modificación" : "creación"
        }?`,
        text: "Los cambios modificados no seran guardados",
        showCancelButton: true,
        showConfirmButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setMostrarModal(false);
          setCategoriaSeleccionada(false);
          resetForm();
        }
      });
    }
  }

  const initialValues = {
    name: categoria?.name || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(20, "*El nombre debe tener máximo 20 carácteres")
      .required("*Campo requerido"),
  });

  function onSubmit(e) {
    setCargando(true);
    try {
      const token = localStorage.getItem("token");
      Swal.fire({
        title: `${categoria ? "Modificar" : "Crear"} categoria?`,
        icon: "question",
        showDenyButton: true,
      }).then(async ({ isConfirmed }) => {
        if (isConfirmed) {
          await dispatch(
            categoria
              ? modificarCategoria({ name: e.name, id: categoria.id }, token)
              : crearCategoria(e, token)
          );
          Swal.fire({
            icon: "success",
            title: `Categoria ${
              categoria ? "modificada" : "creada"
            } correctamente!`,
          }).then((i) => {
            setMostrarModal(false);
            setCategoriaSeleccionada(false);
            resetForm();
          });
        }
      });
    } catch (e) {
      Swal.fire({
        title: "Hubo un problema..",
        text: "Puedes intentar nuevamente!",
        icon: "error",
      });
    }
    setCargando(false);
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
    <div
      onClick={handleBotonCerrar}
      id="fondoModal"
      className={s.contenedorModal}
    >
      <div className={s.contenedorModalIntermedio}>
        <form
          className={s.formulario}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className={s.titulo}>{`${
            categoria ? "Modificando" : "Creando"
          } categoria`}</h1>
          <InputFormulario
            placeholder="Máximo 20 carácteres"
            tipo="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            estiloError={touched.name && errors.name && true}
            mostrarError={touched.name && errors.name && true}
            msjError={errors.name}
            estilos={s.inputFormModificar}
            id={"name"}
            label={"Nombre"}
          />
          {!cargando ? (
            <button className={s.boton} type="submit">
              {`${categoria ? "Modificar" : "Crear"}`} categoria
            </button>
          ) : (
            <ClipLoader />
          )}
        </form>

        <button
          id="botonCerrar"
          className={`${s.boton} ${s.botonCancelar}`}
          onClick={handleBotonCerrar}
          type="button"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default ModalCategoria;

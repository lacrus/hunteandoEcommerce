import React, { useState } from "react";
import s from "./ModalDireccion.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputFormulario from "../../../../../ui/InputFormulario/InputFormulario";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import SelectInputFormulario from "../../../../../ui/SelectInputFormulario/SelectInputFormulario";
import {
  crearDireccionUsuario,
  eliminarDireccionUsuario,
} from "../../../../../redux/actions/actionsDashboardClient";

function ModalDireccion({
  usuario,
  token,
  handleCrearDireccion,
  direccion,
  setMostrarModalDireccion,
  mostrarModalDireccion,
  setDireccion,
}) {
  const provincias = [
    "Buenos Aires",
    "Ciudad Autónoma de Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán",
  ];

  const dispatch = useDispatch();

  const [loadingDireccion, setLoadingDireccion] = useState(false);
  const [eliminandoDireccion, setEliminandoDireccion] = useState(false);

  const initialValues = {
    street: direccion?.street || "",
    number: direccion?.number || "",
    city: direccion?.city || "",
    province: direccion?.province || "",
    detail: direccion?.detail || "",
    contact: direccion?.contact || "",
  };

  const validationSchema = Yup.object().shape({
    street: Yup.string()
      .max(40, "*El calle debe tener máximo 40 carácteres")
      .required("*Campo requerido"),
    number: Yup.number()
      .positive("*El numero debe ser positivo")
      .max(999999, "*Maximo permitido 999.999")
      .test("is-decimal", "*No se aceptan decimales", (value) =>
        (value + "").match(/^\d*\.{0}\d*$/)
      )
      .required("*Campo requerido"),
    city: Yup.string()
      .max(40, "*La ciudad debe tener máximo 40 carácteres")
      .required(),
    province: Yup.string().required("*Campo requerido").nullable(),
    detail: Yup.string().max(40, "*La ciudad debe tener máximo 40 carácteres"),
    contact: Yup.number().max(8888888888888, "*Número incorrecto"),
  });

  async function onSubmit(e) {
    e.id = direccion?.id;
    handleCrearDireccion(e);
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

  function handleCerrarModalDireccion(e) {
    if (e.target.id === "fondoModal" || e.target.id === "botonCerrar")
      Swal.fire({
        title: `Cancelar ${
          mostrarModalDireccion === "nuevaDireccion"
            ? "creación"
            : "modificación"
        } de la dirección?`,
        text: "Los cambios realizados seran perdidos",
        icon: "question",
        showDenyButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setMostrarModalDireccion(!mostrarModalDireccion);
          setDireccion({});
        }
      });
  }

  function handleEliminarDireccion() {
    Swal.fire({
      title: "Eliminando dirección!",
      text: "Seguro desea eliminar la dirección?",
      icon: "warning",
      showDenyButton: true,
    }).then(async ({ isConfirmed }) => {
      setEliminandoDireccion(true);
      try {
        if (isConfirmed) {
          await dispatch(
            eliminarDireccionUsuario(usuario.id, direccion.id, token)
          );
          setMostrarModalDireccion(!mostrarModalDireccion);
          setDireccion({});
        }
      } catch (e) {
        Swal.fire(
          "Error al eliminar la dirección!",
          "Vuelve a intentarlo mas tarde",
          "error"
        );
      }
      setEliminandoDireccion(false);
    });
  }

  return (
    <div
      onClick={handleCerrarModalDireccion}
      id="fondoModal"
      className={s.contenedorModalDireccion}
    >
      <div className={s.contenedorIntermedioModalDireccion}>
        <form
          className={s.formularioModalDireccion}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h1 className={s.titulo}>
            {mostrarModalDireccion === "nuevaDireccion"
              ? "Creando"
              : "Modificando"}{" "}
            dirección...
          </h1>
          <div className={s.renglon}>
            <InputFormulario
              placeholder="Máximo 40 carácteres"
              tipo="text"
              name="street"
              value={values.street}
              onChange={handleChange}
              onBlur={handleBlur}
              estiloError={touched.street && errors.street && true}
              mostrarError={touched.street && errors.street && true}
              msjError={errors.street}
              estilos={s.itemRenglon}
              id={"street"}
              label={"Calle"}
            />
            <InputFormulario
              placeholder="ej: 1398"
              tipo="number"
              name="number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              estiloError={touched.number && errors.number && true}
              mostrarError={touched.number && errors.number && true}
              msjError={errors.number}
              estilos={s.itemRenglon}
              id={"number"}
              label={"Número"}
            />
          </div>
          <div className={s.renglon}>
            <InputFormulario
              placeholder="Máximo 40 carácteres"
              tipo="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              estiloError={touched.city && errors.city && true}
              mostrarError={touched.city && errors.city && true}
              msjError={errors.city}
              estilos={s.itemRenglon}
              id={"city"}
              label={"Ciudad"}
            />
            <SelectInputFormulario
              name="province"
              value={values.province}
              options={provincias}
              onChange={handleChange}
              onBlur={handleBlur}
              estiloError={touched.province && errors.province && true}
              mostrarError={touched.province && errors.province && true}
              msjError={errors.province}
              estilos={s.itemRenglon}
              id={"province"}
              label={"Provincia"}
              touched={touched}
            />
          </div>
          <label className={s.textareaLabelModificar} htmlFor="detail">
            Detalles
          </label>
          <textarea
            id="detail"
            placeholder="Máximo 40 carácteres"
            name="detail"
            rows={3}
            value={values.detail}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${s.input} ${
              touched.detail && errors.detail && s.error
            } ${s.textareaCrear}`}
          />
          {touched.detail && errors.detail && (
            <p className={`${s.msjError} ${s.error}`}>{errors.detail}</p>
          )}
          <InputFormulario
            placeholder="ej: 01115123456"
            tipo="number"
            name="contact"
            value={values.contact}
            onChange={handleChange}
            onBlur={handleBlur}
            estiloError={touched.contact && errors.contact && true}
            mostrarError={touched.contact && errors.contact && true}
            msjError={errors.contact}
            estilos={s.itemRenglon}
            id={"contact"}
            label={"Número contacto"}
          />

          {!loadingDireccion ? (
            <button className={s.botonModificar} type="submit">
              {mostrarModalDireccion === "nuevaDireccion"
                ? "Crear"
                : "Modificar"}{" "}
              dirección
            </button>
          ) : (
            <PulseLoader />
          )}
        </form>
        {mostrarModalDireccion ===
        "nuevaDireccion" ? null : !eliminandoDireccion ? (
          <button
            className={`${s.botonModificar} ${s.botonBorrarDireccion}`}
            type="button"
            onClick={handleEliminarDireccion}
          >
            Eliminar dirección
          </button>
        ) : (
          <PulseLoader />
        )}
      </div>

      <AiOutlineCloseCircle
        id="botonCerrar"
        onClick={handleCerrarModalDireccion}
        className={s.iconoCerrar}
      />
    </div>
  );
}

export default ModalDireccion;

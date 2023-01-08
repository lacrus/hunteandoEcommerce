import React from "react";
import s from "./SelectInputFormulario.module.css";

export default function SelectInputFormulario({
  name,
  value,
  onChange,
  onBlur,
  estiloError,
  mostrarError,
  msjError,
  estilos,
  estilosLabel,
  id,
  label,
  options,
  touched,
}) {
  return (
    <div className={`${s.contenedor} ${estilos && estilos}`}>
      <label
        className={`${estilosLabel && s.estilosLabel} ${
          estiloError && s.error
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <select
        onChange={onChange ? onChange : undefined}
        onBlur={onBlur}
        value={value}
        className={`${s.input} ${estiloError && s.error}`}
        name={name}
        id={id}
      >
        <option value="desabilitado" disabled={value.length ? true : false}>
          Selecciona una opción
        </option>
        {options.map((i) => {
          return (
            <option key={i} value={i}>
              {i}
            </option>
          );
        })}
      </select>
      {mostrarError && (
        <div className={`${s.msjError} ${s.error}`}>{msjError}</div>
      )}
    </div>
  );
}

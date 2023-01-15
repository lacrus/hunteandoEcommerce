import React from "react";
import s from "./TextAreaInput.module.css";

function TextAreaInput({
  id,
  placeholder,
  name,
  rows,
  value,
  onBlur,
  onChange,
  estiloError,
  mostrarError,
  msjError,
  estilosLabel,
}) {
  return (
    <div classname={s.contenedorTextArea}>
      <label
        className={`${s.textareaLabelCrear} ${
          estilosLabel ? s.estilosLabel : null
        }`}
        htmlFor="descripcion"
      >
        Descripción
      </label>
      <textarea
        id={id}
        placeholder={placeholder}
        name={name}
        rows={parseInt(rows)}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${s.input} ${estiloError && s.error} ${s.textareaCrear}`}
      />
      {mostrarError && <p className={`${s.msjError} ${s.error}`}>{msjError}</p>}
    </div>
  );
}

export default TextAreaInput;

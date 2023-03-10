import React from "react";
import s from "./TarjetaProducto.module.css";
import { PulseLoader } from "react-spinners";
import { GrCart } from "react-icons/gr";

function TarjetaProducto({
  imgNotFound,
  esMovil,
  accionEnHover,
  imagen,
  id,
  nombre,
  precio,
}) {
  return (
    <div className={s.contenedorTarjeta} onClick={accionEnHover}>
      <div className={s.contenedorImg}>
        <img
          src={imagen ? imagen : imgNotFound}
          alt="img producto"
          className={s.imagenTarjeta}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imgNotFound;
          }}
        />
        <div
          className={`${s.agregarAlCarroContenedor} ${
            esMovil ? s.visible : null
          }`}
        >
          <div className={s.agregarAlCarro}>Ir al producto</div>
        </div>
      </div>
      <div className={s.nombre}>
        {nombre
          ? nombre[0].toUpperCase() + nombre.substring(1)
          : "Nombre producto"}
      </div>

      <div className={s.iconoPrecio}>
        <GrCart className={s.icono} />
        <div className={s.precio}>$ {precio}</div>
      </div>
    </div>
  );
}

export default TarjetaProducto;

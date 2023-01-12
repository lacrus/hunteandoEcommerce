import React from "react";
import s from "./TarjetaProducto.module.css";
import { PulseLoader } from "react-spinners";
import { GrCart } from "react-icons/gr";

function TarjetaProducto({
  imgNotFound,
  agregandoProducto,
  esMovil,
  handleAgregarAlCarro,
  imagen,
  id,
  nombre,
  precio,
}) {
  return (
    <div className={s.contenedorTarjeta} onClick={handleAgregarAlCarro}>
      <div className={s.contenedorImg}>
        <img
          // id="imagenCuadrada"
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
          {agregandoProducto ? (
            <PulseLoader color="orange" />
          ) : (
            <div
              className={s.agregarAlCarro}
              // onClick={() => handleAgregarAlCarro(id)}
            >
              Ir al producto
            </div>
          )}
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

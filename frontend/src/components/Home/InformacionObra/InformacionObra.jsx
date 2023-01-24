import React from "react";
import s from "./InformacionObra.module.css";

import picture1 from "../../../assets/images/picture1.jpg";

import imgNotFound from "../../../assets/images/imgNotFound.jpg";

export default function InformacionObra() {
  return (
    <div className={s.contenedorSegundoComponente}>
      <div className={s.contenedorImagenHome}>
        <img
          src={picture1}
          alt="img principal home"
          className={s.imagenHome}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imgNotFound;
          }}
        />
      </div>

      <div className={s.contenedorDerechaHome}>
        <div className={s.tituloContenedorDerecha}>Trashumante</div>
        <div className={s.textoContenedorDerecha}>
          {/* ¡Gracias a quienes apoyan el trabajo artístico! Si aún no pudieron ir
          de lunes a viernes de 9 a 12 y de 17 a 20 en Córdoba 794, esquina 9 de
          julio, permanece la muestra */}
          Trashumante, el trazo inconsciente, es un proceso, un hallazgo sin
          búsqueda que se volvió mi estilo, mi forma de hacer y ser en el arte.
          Nació en pleno viaje cuando mi hogar estaba más en una mochila que en
          una casa. Un equipaje donde siempre había hojas, pinceles, tintas y
          paradas seguras donde la constante eran la música y lxs amigues
        </div>
        <a
          className={s.contenedorBoton}
          href="Catalogo_Trashumante.pdf"
          download="Catalogo_Trashumante.pdf"
        >
          <div>Ver Más</div>
        </a>

        <div className={s.textoSecundarioContenedorDerecha}>
          {/* “El equilibrio es una de las artes milenarias que ejercito hace años,
          en donde sea y como sea lo mantengo a la perfección, en el cuerpo,
          RESPIRO, pero un monstruo de lengua larga y fluorescente sigue
          hablando sin pausa dentro de mi.” */}
          Del ruido y el cambio, surgue este estilo múltiple, que contiene
          mundos superpuestos con realidades paralelas y mucho detalle.
        </div>
      </div>
    </div>
  );
}

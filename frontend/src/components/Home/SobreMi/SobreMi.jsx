import React from "react";
import s from "./SobreMi.module.css";

import imgSobreMi from "../../../assets/images/Sobremi.png";


export default function SobreMi() {
  return (
    <div className={s.contenedorSobreMi}>
      <div className={s.primerParteSobreMi}>
        <div className={s.tituloSobreMi}>Sobre mi obra</div>
        <div className={s.textoSobreMi}>
          Un recorrido que trae las formas de lo onírico e inicia por los duelos
          y el dejar ir.
        </div>
        <div className={s.contenedorBotonSobreMi}>
          <div>ACERCA DE MI</div>
        </div>
      </div>
      <img src={imgSobreMi} alt="sobre mi obra" className={s.imagenSobreMi} />
    </div>
  );
}

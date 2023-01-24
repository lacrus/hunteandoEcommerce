import React from "react";
import s from "./SobreMi.module.css";

import imgSobreMi from "../../../assets/images/Sobremi.png";
import imgNotFound from "../../../assets/images/imgNotFound.jpg";
import { useNavigate } from "react-router-dom";

export default function SobreMi() {
  const navigate = useNavigate();
  return (
    <div className={s.contenedorSobreMi}>
      <div className={s.primerParteSobreMi}>
        <div className={s.tituloSobreMi}>Sobre mi obra</div>
        <div className={s.textoSobreMi}>
          Un recorrido que trae las formas de lo onírico e inicia por los duelos
          y el dejar ir.
        </div>
        <div
          className={s.contenedorBotonSobreMi}
          onClick={() => navigate("/sobremi")}
        >
          <div>ACERCA DE MI</div>
        </div>
      </div>
      <img
        src={imgSobreMi}
        alt="sobre mi obra"
        className={s.imagenSobreMi}
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = imgNotFound;
        }}
      />
    </div>
  );
}

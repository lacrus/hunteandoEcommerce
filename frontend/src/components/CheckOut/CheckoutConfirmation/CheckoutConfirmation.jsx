import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";
import s from "./CheckoutConfirmation.module.css";

export default function CheckoutConfirmation({ usuario }) {
  const navigate = useNavigate();

  return (
    <div className={s.contenedorRespuestaCheckout}>
      <div className={s.textConfirmation}>
        <span>
          <BsFillPatchCheckFill className={`${s.icono} ${s.confimacion}`} />
        </span>
        <h1 className={s.tituloRespuestaCheckout}>
          Su compra fue realizada con éxito!
        </h1>
        <p>
          Recibirá un mail a {usuario?.email || "su casilla de mensajes "} con
          los datos de su compra.
        </p>
      </div>

      <div onClick={() => navigate("/")} className={s.contenedorBotonHeader}>
        <div className={s.botonHeader}>Ir a Inicio</div>
      </div>
    </div>
  );
}

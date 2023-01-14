import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import s from "../CheckoutConfirmation/CheckoutConfirmation.module.css";

export default function CheckoutCancel({ usuario }) {
  const navigate = useNavigate();

  return (
    <div className={s.contenedorRespuestaCheckout}>
      <div className={s.textConfirmation}>
        <span>
          <MdCancel className={`${s.icono} ${s.cancelado}`} />
        </span>
        <h1 className={s.tituloRespuestaCheckout}>Pago cancelado!</h1>
      </div>
      <div onClick={() => navigate("/")} className={s.contenedorBotonHeader}>
        <div className={s.botonHeader}>Ir a Inicio</div>
      </div>
    </div>
  );
}

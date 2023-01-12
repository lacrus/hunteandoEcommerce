import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsFillPatchCheckFill } from "react-icons/bs";
import s from "./CheckoutConfirmation.module.css";
import { useDispatch } from "react-redux";
import { verificarPago } from "../../../redux/actions/actionsShop";

export default function CheckoutConfirmation({ usuario }) {
  const navigate = useNavigate();

  const { search } = useLocation();

  const payment_id = search
    ?.split("&")
    ?.find((i) => i.includes("payment_id"))
    ?.split("=")[1];

  const dispatch = useDispatch();

  useEffect(() => {
    if (payment_id && usuario.id) {
      (async () => {
        dispatch(verificarPago(payment_id, usuario.id));
      })();
    }
  }, [usuario, payment_id]);

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
        <p></p>
      </div>

      <div onClick={() => navigate("/")} className={s.contenedorBotonHeader}>
        <div className={s.botonHeader}>Ir a Inicio</div>
      </div>
    </div>
  );
}

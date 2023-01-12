import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsPatchExclamation } from "react-icons/bs";
import s from "../CheckoutConfirmation/CheckoutConfirmation.module.css";

import { useDispatch } from "react-redux";
import { verificarPago } from "../../../redux/actions/actionsShop";

export default function CheckoutPending({ usuario }) {
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
          <BsPatchExclamation className={`${s.icono} ${s.confimacion}`} />
        </span>
        <h1>Su compra se encuentra pendiente de pago!</h1>
        <p>
          Recibirá un mail a {usuario?.email || "su casilla de mensajes "}{" "}
          cuando se actualize el estado de la misma.
        </p>
        <br />
        <p>
          Luego nos contactaremos para proporcionar el número de seguimiento de
          su pedido
        </p>
      </div>
      <div onClick={() => navigate("/")} className={s.contenedorBotonHeader}>
        <div className={s.botonHeader}>Ir a Inicio</div>
      </div>
    </div>
  );
}

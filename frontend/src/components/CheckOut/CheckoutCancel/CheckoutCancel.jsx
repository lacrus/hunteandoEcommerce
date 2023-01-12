import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import s from "../CheckoutConfirmation/CheckoutConfirmation.module.css";
import { useEffect } from "react";
import { verificarPago } from "../../../redux/actions/actionsShop";

export default function CheckoutCancel({ usuario }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let { payment_id } = useParams();

  useEffect(() => {
    (async () => {
      dispatch(verificarPago(payment_id, usuario.id));
    })();
  }, []);

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

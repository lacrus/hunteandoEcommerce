import React, { useState } from "react";
import s from "./ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import imgNotFound from "../../assets/images/imgNotFound.jpg";
import { useEffect } from "react";
import { obtenerDetallesProducto } from "../../redux/actions/actionsShop";
import Swal from "sweetalert2";
import { agregarProductoCarrito } from "../../redux/actions/actionsCart";

export default function ProductDetail({ usuario }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const producto = useSelector((e) => e.tienda.detallesProducto);
  // const usuario = useSelector((e) => e.general.usuario);
  const [pedido, setPedido] = useState({ cantidad: 1 });
  const [loading, setLoading] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  async function handleAgregarCarrito() {
    const prod = {
      id,
      quantity: cantidadSeleccionada,
    };
    if (usuario?.username) {
      const token = localStorage.getItem("token");
      await dispatch(agregarProductoCarrito(usuario.id, prod, token));
    } else {
      navigate(`/login/${id}`);
    }
  }

  function handleSeleccionarImagen(foto) {
    setImagenSeleccionada(foto);
  }

  function handleCantidadSeleccionada(e) {
    setCantidadSeleccionada(e.target.value);
  }

  useEffect(() => {
    if (id) {
      console.log(id);
      (async () => {
        setLoading(true);
        try {
          const respuesta = await dispatch(obtenerDetallesProducto(id));
          setImagenSeleccionada(respuesta.payload?.image[0]);
        } catch (error) {
          console.log(error);
          Swal.fire(
            "Hubo un problema",
            "Vuelve a intentarlo mas tarde",
            "error"
          );
        }
        setLoading(false);
      })();
    }
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(obtenerDetallesProducto());
    };
  }, []);

  return (
    <div className={s.contenedorDetalle}>
      <div className={`${s.nombreProducto} ${s.nombreProductoCel}`}>
        {producto?.name}
      </div>

      <div className={s.contenedorIzquierdo}>
        <img
          className={s.imagenProducto}
          src={imagenSeleccionada || imgNotFound}
          alt="imagen producto"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = imgNotFound;
          }}
        />
        <div className={s.contenedorImagenesMiniaturaProducto}>
          {producto?.image?.map((i, idx) => {
            return (
              <img
                key={"img" + idx}
                onClick={() => handleSeleccionarImagen(i)}
                className={s.imagenMiniaturaProducto}
                src={i}
                alt="imagen producto"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = imgNotFound;
                }}
              />
            );
          })}
        </div>
      </div>

      <div className={s.contenedorDerecho}>
        <div className={s.detalles}>
          <div className={s.nombreProducto}>{producto?.name}</div>
          <div className={s.precioProducto}>
            ${" "}
            {parseInt(producto?.price * cantidadSeleccionada).toLocaleString(
              "es"
            )}
          </div>
          <div className={s.contenedorCantidad}>
            <div>Cantidad</div>
            <select
              onChange={handleCantidadSeleccionada}
              className={s.selectCantidadProducto}
              name="cantidad"
              id="cantidad"
            >
              {producto?.stock < 1 ? (
                <option value="sinStock">Sin Stock</option>
              ) : (
                new Array(producto?.stock || 1).fill().map((i, idx) => {
                  return (
                    <option key={idx} value={idx + 1}>{`${idx + 1} ${
                      idx === 0 ? "unidad" : "unidades"
                    }`}</option>
                  );
                })
              )}
            </select>
          </div>
        </div>
        {producto?.stock >= 1 ? (
          <div className={s.botones} display={producto?.stock ? true : "none"}>
            <div className={`${s.boton} ${s.botonComprar}`}>Comprar</div>
            <div
              onClick={handleAgregarCarrito}
              className={`${s.boton} ${s.botonAgregar}`}
            >
              Agregar al carrito
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

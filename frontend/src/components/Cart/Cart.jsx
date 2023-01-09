import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Counter from "./Counter/Counter";

import s from "./Cart.module.css";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";

import imgCarroVacio from "../../assets/images/vacio.jpg";
import imgNotFound from "../../assets/images/imgNotFound.jpeg";

import {
  eliminarProductoCarrito,
  vaciarCarrito,
} from "../../redux/actions/actionsCart";


export default function Cart({ usuario }) {
  const dispatch = useDispatch();

  const productos = useSelector((e) => e.carro.carro.CartItems);
  const carrito = useSelector((e) => e.carro.carro);

  const token = localStorage.getItem("token");

  const [total, setTotal] = useState(0);

  async function handleVaciarCarrito() {
    Swal.fire({
      icon: "question",
      title: "Seguro desea eliminar todo del carrito?",
      showDenyButton: true,
      denyButtonText: "Volver",
    }).then(({ isConfirmed }) => {
      if (isConfirmed)
        dispatch(vaciarCarrito(usuario.id, { id: carrito.id }, token));
    });
  }

  function handleEliminarProducto(e) {
    Swal.fire({
      icon: "question",
      title: "Seguro desea eliminar el producto?",
      showDenyButton: true,
      denyButtonText: "Volver",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        await dispatch(eliminarProductoCarrito(usuario.id, { id: e }, token));
      }
    });
  }

  useEffect(() => {
    let result = 0;
    if (productos) {
      for (const carro of productos) {
        let final = carro.quantity * carro.Product.price;
        result += final;
      }
      setTotal(result);
    }
  }, [productos]);

  return productos?.length === 0 ? (
    <div className={s.contenedorCarroVacio}>
      <div className={s.carroVacio}>
        <div className={s.tituloCarro}>Carro vacio</div>
        <img src={imgCarroVacio} alt="carroVacio" className={s.imgCarroVacio} />
        <Link to="/" className={s.contenedorBoton}>
          <div className={s.boton}>Volver a comprar</div>
        </Link>
      </div>
    </div>
  ) : (
    <div className={s.contenedorCarro}>
      <h2 className={s.tituloCarro}>Mi carrito</h2>
      <div className={s.contenedorPanel}>
        <div className={s.contenedorProductos}>
          {productos?.map((item) => {
            return (
              <div key={item.id} className={s.tarjetaProductos}>
                <div className={s.contenedorImagenTarjeta}>
                  <img
                    src={
                      item.Product.image?.length
                        ? item.Product.image[0]
                        : imgNotFound
                    }
                    alt="Imagen producto"
                    className={s.imagenTarjeta}
                  />
                </div>
                <div className={s.contenedorInformacionTarjeta}>
                  <h3>Precio: ${item.Product.price}</h3>
                  <p sx={{ fontFamily: "comspotExI", marginBottom: "2rem" }}>
                    {item.info}
                  </p>
                  <Counter
                    token={token}
                    userId={usuario.id}
                    cantidadInicial={item.quantity}
                    cantidadDisponible={item.Product.stock}
                    idProducto={item.Product.id}
                    itemCartId={item.id}
                    handleEliminarProducto={() =>
                      handleEliminarProducto(item.id)
                    }
                  />
                </div>
                <MdDelete
                  className={s.botonEliminarTarjeta}
                  onClick={() => handleEliminarProducto(item.id)}
                />
              </div>
            );
          })}
        </div>

        <div className={s.contenedorTotales}>
          <h2>precios totales</h2>
          <h3>Productos en total: {productos?.length}</h3>
          <h3>
            Envio: <span>FREE</span>
          </h3>
          <h2 className={s.texto_total}>Total : $ {total}</h2>
          <div className={s.contenedorBotonCheckout}>CheckOut</div>
        </div>
      </div>
      <div className={s.links}>
        <Link to="/" className={s.contenedorBoton}>
          <div className={s.boton}>Volver a comprar</div>
        </Link>

        <div
          className={`${s.contenedorBoton} ${s.botonVaciarCarrito}`}
          onClick={handleVaciarCarrito}
        >
          <div className={s.boton}>Vaciar carrito</div>
        </div>
      </div>
    </div>
  );
}

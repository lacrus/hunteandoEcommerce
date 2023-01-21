import React, { useState, useEffect } from "react";
import s from "./Cart.module.css";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Counter from "./Counter/Counter";

import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
import { ClipLoader } from "react-spinners";

import imgCarroVacio from "../../assets/images/vacio.jpg";
import imgNotFound from "../../assets/images/imgNotFound.jpg";

import {
  eliminarProductoCarrito,
  vaciarCarrito,
} from "../../redux/actions/actionsCart";

export default function Cart({ usuario }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productos = useSelector((e) => e.carro.carro.CartItems);
  const carrito = useSelector((e) => e.carro.carro);

  const token = localStorage.getItem("token");

  const [total, setTotal] = useState(0);
  const [cargandoProducto, setCargandoProducto] = useState(false);

  async function handleVaciarCarrito() {
    setCargandoProducto(true);
    Swal.fire({
      icon: "question",
      title: "Seguro desea eliminar todo del carrito?",
      showDenyButton: true,
      denyButtonText: "Volver",
    }).then(async ({ isConfirmed }) => {
      try {
        if (isConfirmed)
          await dispatch(vaciarCarrito(usuario.id, { id: carrito.id }, token));
      } catch (error) {
        Swal.fire(
          "Hubo un problema!",
          "Intentalo nuevamente mas tarde",
          "error"
        );
      } finally {
        setCargandoProducto(false);
      }
    });
  }

  function handleEliminarProducto(e) {
    setCargandoProducto(true);
    Swal.fire({
      icon: "question",
      title: "Seguro desea eliminar el producto?",
      showDenyButton: true,
      denyButtonText: "Volver",
    }).then(async ({ isConfirmed }) => {
      try {
        if (isConfirmed)
          await dispatch(eliminarProductoCarrito(usuario.id, { id: e }, token));
        setCargandoProducto(false);
      } catch (error) {
        Swal.fire(
          "Hubo un problema!",
          "Intentalo nuevamente mas tarde",
          "error"
        );
        setCargandoProducto(false);
      }
    });
  }

  async function handleCheckOut() {
    if (productos?.length) {
      navigate("/finalizarcompra");
    }
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
        <Link to="/tienda" className={s.contenedorBoton}>
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
            console.log(item);
            return (
              <div key={item.id} className={s.tarjetaProductos}>
                {cargandoProducto ? (
                  <div className={s.contendedorLoadingTarjetaCart}>
                    <ClipLoader color="orange" />
                  </div>
                ) : (
                  <>
                    <div className={s.contenedorImagenTarjeta}>
                      <img
                        onClick={() =>
                          navigate(`/tienda/detalles/${item.Product.id}`)
                        }
                        src={
                          item.Product.image?.length
                            ? item.Product.image[0]
                            : imgNotFound
                        }
                        alt="Imagen producto"
                        className={s.imagenTarjeta}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = imgNotFound;
                        }}
                      />
                    </div>
                    <div className={s.contenedorInformacionTarjeta}>
                      <div>
                        <h3>Precio: ${item.Product.price}</h3>
                        <Counter
                          token={token}
                          userId={usuario.id}
                          cantidadInicial={item.quantity}
                          cantidadDisponible={item.Stock?.quantity}
                          idStock={item.Stock?.id}
                          idProducto={item.Product.id}
                          itemCartId={item.id}
                          handleEliminarProducto={() =>
                            handleEliminarProducto(item.id)
                          }
                          setCargandoProducto={setCargandoProducto}
                        />
                      </div>

                      <div className={s.informacionTarjetaDerecha}>
                        <h3>
                          {`${item.Product.name[0].toUpperCase()}${item.Product.name.slice(
                            1,
                            10
                          )}${item.Product.name.length > 10 ? "..." : ""}
                           `}
                        </h3>
                        <div>
                          <p>Talle: {item.Stock.size}</p>
                          <p>Color: {item.Stock.color}</p>
                        </div>
                      </div>
                    </div>
                    <MdDelete
                      className={s.botonEliminarTarjeta}
                      onClick={() => handleEliminarProducto(item.id)}
                    />
                  </>
                )}
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
          <div className={s.contenedorBotonCheckout} onClick={handleCheckOut}>
            CheckOut
          </div>
        </div>
      </div>
      <div className={s.links}>
        <Link to="/tienda" className={s.contenedorBoton}>
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

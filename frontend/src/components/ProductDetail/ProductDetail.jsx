import React, { useState } from "react";
import s from "./ProductDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import imgNotFound from "../../assets/images/imgNotFound.jpg";
import { useEffect } from "react";
import { obtenerDetallesProducto } from "../../redux/actions/actionsShop";
import Swal from "sweetalert2";
import { agregarProductoCarrito } from "../../redux/actions/actionsCart";
import Loading from "../Loading/Loading";

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

  async function handleAgregarCarrito(accion) {
    const prod = {
      id,
      quantity: cantidadSeleccionada,
    };
    if (usuario?.username) {
      try {
        const token = localStorage.getItem("token");
        await dispatch(agregarProductoCarrito(usuario.id, prod, token));
        if (accion) {
          navigate("/carrito");
        }
      } catch (error) {
        Swal.fire("Hubo un problema!", "Vuelve a intentarlo.", "error");
      }
    } else {
      Swal.fire({
        title: "Inicia sesión!",
        text: "O crea una cuenta.",
        icon: "warning",
        showConfirmButton: true,
        confirmButtonText: "Iniciar sesión",
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: "Registrarse",
        denyButtonColor: "grey",
        cancelButtonColor: "red",
      }).then(({ isConfirmed, isDenied }) => {
        if (isConfirmed) {
          navigate(`/login/${id}`);
        } else if (isDenied) {
          navigate(`/registrarse/${id}`);
        }
      });
    }
  }

  function handleSeleccionarImagen(foto) {
    setImagenSeleccionada(foto);
  }

  function handleCantidadSeleccionada(accion) {
    let cantidad = cantidadSeleccionada;
    if (accion === "mas") {
      if (cantidadSeleccionada < producto?.stock) {
        setCantidadSeleccionada((cantidad += 1));
      }
    } else {
      if (cantidadSeleccionada > 0) {
        setCantidadSeleccionada((cantidad -= 1));
      }
    }
  }

  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        try {
          const respuesta = await dispatch(obtenerDetallesProducto(id));
          setImagenSeleccionada(respuesta.payload?.image[0]);
        } catch (error) {
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
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={`${s.nombreProducto} ${s.nombreProductoCel}`}>
            {producto.name
              ? producto?.name[0]?.toUpperCase() + producto?.name?.slice(1)
              : producto?.name}
          </div>
          <div className={s.contenedorIzquierdo}>
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
            <img
              className={s.imagenProducto}
              src={imagenSeleccionada || imgNotFound}
              alt="imagen producto"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = imgNotFound;
              }}
            />
          </div>

          <div className={s.contenedorDerecho}>
            <div className={s.detalles}>
              <div className={s.nombreProducto}>
                {producto.name
                  ? producto?.name[0]?.toUpperCase() + producto?.name?.slice(1)
                  : producto?.name}
              </div>
              <div className={s.precioProducto}>
                ${" "}
                {parseInt(
                  producto?.price * cantidadSeleccionada
                ).toLocaleString("es")}
              </div>
              <div className={s.contenedorCantidadStock}>
                <div className={s.contenedorCantidad}>
                  <div className={s.tituloCantidad}>Cantidad</div>

                  <div className={s.selectorCantidad}>
                    <div
                      className={s.masMenos}
                      onClick={() => handleCantidadSeleccionada("menos")}
                    >
                      -
                    </div>
                    <div className={s.cantidad}>
                      {producto?.stock < 1 ? 0 : cantidadSeleccionada}
                    </div>
                    <div
                      className={s.masMenos}
                      onClick={() => handleCantidadSeleccionada("mas")}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className={s.contenedorCantidad}>
                  <div className={s.tituloCantidad}>Stock</div>
                  <div className={s.tituloCantidad}>{producto?.stock}</div>
                </div>
              </div>
              <div className={s.descripcion}>{producto?.description}</div>
            </div>
            {producto?.stock >= 1 ? (
              <div
                className={s.botones}
                display={producto?.stock ? true : "none"}
              >
                <div
                  onClick={() => handleAgregarCarrito()}
                  className={`${s.boton} ${s.botonAgregar}`}
                >
                  AGREGAR AL CARRO
                </div>
                <div
                  className={`${s.boton} ${s.botonComprar}`}
                  onClick={() => handleAgregarCarrito("comprar")}
                >
                  REALIZAR COMPRA
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
}

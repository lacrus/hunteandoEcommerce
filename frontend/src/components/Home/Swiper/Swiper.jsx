import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrPrevious, GrNext, GrCart } from "react-icons/gr";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import s from "./Swiper.module.css";
import resizeHook from "../../../hooks/resizeHook";
import { obtenerProductosRandomTienda } from "../../../redux/actions/actionsShop";
import imgNotFound from "../../../assets/images/imgNotFound.jpeg";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { agregarProductoCarrito } from "../../../redux/actions/actionsCart";
SwiperCore.use([Navigation]);

export default function ComponenteSwiper({ usuario }) {
  const productos = useSelector((e) => e.tienda.productosRandom);
  const dispatch = useDispatch();

  const [agregandoProducto, setAgregandoProducto] = useState(false);

  const tamanoPantalla = resizeHook();
  let cantidadTarjetas =
    tamanoPantalla.width > 800 ? 3 : tamanoPantalla.width > 400 ? 2 : 1;
  const esMovil = resizeHook().isMobile;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  async function handleAgregarAlCarro(id) {
    const producto = {
      id,
      quantity: 1,
    };
    try {
      const token = localStorage.getItem("token");
      const agregado = await dispatch(
        agregarProductoCarrito(usuario.id, producto, token)
      );
      if (agregado.mensaje === "stock limit") {
        Swal.fire(
          "El producto esta en el carrito!",
          "Llegaste al limite de unidades",
          "info"
        );
      }
    } catch (e) {
      Swal.fire(
        "Error al cargar el producto!",
        "Intentalo nuevamente mas tarde",
        "error"
      );
    }
  }

  useEffect(() => {
    (async () => {
      await dispatch(obtenerProductosRandomTienda());
    })();
  }, []);

  return (
    <div className={s.contenedorSwiper}>
      <div className={s.encabezadoSwiper}>
        <div className={s.tituloSwiper}>Mi tienda</div>
        <div className={s.vermasSwiper}>{`Ver más ->`}</div>
      </div>
      <Swiper
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = navigationPrevRef.current;
          swiper.params.navigation.nextEl = navigationNextRef.current;
        }}
        spaceBetween={cantidadTarjetas < 3 ? 30 : 50}
        slidesPerView={cantidadTarjetas}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        // className={cantidadTarjetas < 3 ? s.swiper : null}
      >
        {productos?.map((i) => {
          return (
            <SwiperSlide key={i.id} className={s.contenedorTarjetaSwiper}>
              <div className={s.contenedorImg}>
                <img
                  src={i.image || imgNotFound}
                  alt="img producto"
                  className={s.imagenTarjetaSwiper}
                />
                <div
                  className={`${s.agregarAlCarroContenedor} ${
                    esMovil ? s.visible : null
                  }`}
                >
                  {agregandoProducto ? (
                    <PulseLoader color="orange" />
                  ) : (
                    <div
                      className={s.agregarAlCarro}
                      onClick={() => handleAgregarAlCarro(i.id)}
                    >
                      Agregar al carro
                    </div>
                  )}
                </div>
              </div>
              <div className={s.nombreSwiper}>
                {i.name[0].toUpperCase() + i.name.substring(1)}
              </div>

              <div className={s.iconoPrecioSwiper}>
                <GrCart className={s.iconoSwiper} />
                <div className={s.precioSwiper}>${i.price}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        ref={navigationPrevRef}
        className={`${s.contenedorFlechaSwiper} ${s.flechaAtrasSwiper}`}
      >
        <GrPrevious className={s.flechaSwiper} />
      </div>
      <div
        ref={navigationNextRef}
        className={`${s.contenedorFlechaSwiper} ${s.flechaAdelanteSwiper}`}
      >
        <GrNext className={s.flechaSwiper} />
      </div>
    </div>
  );
}

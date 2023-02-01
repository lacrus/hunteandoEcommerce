import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrPrevious, GrNext, GrCart } from "react-icons/gr";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import s from "./Swiper.module.css";
import resizeHook from "../../hooks/resizeHook";
import { obtenerProductosRandomTienda } from "../../redux/actions/actionsShop";
import imgNotFound from "../../assets/images/imgNotFound.jpg";
import Swal from "sweetalert2";
import { PulseLoader } from "react-spinners";
import { agregarProductoCarrito } from "../../redux/actions/actionsCart";
import { useNavigate } from "react-router-dom";
SwiperCore.use([Navigation]);

export default function ComponenteSwiper({ usuario, productos, titulo }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [agregandoProducto, setAgregandoProducto] = useState(false);
  const sinProductos = [{ name: "Sin productos", price: 0, img: imgNotFound }];

  const tamanoPantalla = resizeHook();
  let cantidadTarjetas =
    tamanoPantalla.width > 800 ? 3 : tamanoPantalla.width > 400 ? 2 : 1;
  const esMovil = resizeHook().isMobile;

  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  async function handleAgregarAlCarro(id) {
    navigate(`/tienda/detalles/${id}`);
  }

  return (
    <div className={s.contenedorSwiper}>
      <div className={s.encabezadoSwiper}>
        <div className={s.tituloSwiper}>{titulo}</div>
        <div
          onClick={() => navigate("/tienda")}
          className={s.vermasSwiper}
        >{`Ver más ->`}</div>
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
      >
        {productos?.map((i) => {
          return (
            <SwiperSlide key={i.id} className={s.contenedorTarjetaSwiper}>
              <div className={s.contenedorImg}>
                <img
                  src={i.image[0] || imgNotFound}
                  alt="img producto"
                  className={s.imagenTarjetaSwiper}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = imgNotFound;
                  }}
                />
                <div
                  className={`${s.agregarAlCarroContenedor} ${
                    esMovil ? s.visible : null
                  }`}
                >
                  <div
                    className={s.agregarAlCarro}
                    onClick={() => handleAgregarAlCarro(i.id)}
                  >
                    Ir al producto
                  </div>
                </div>
              </div>
              <div
                className={s.nombreSwiper}
                onClick={() => navigate(`/tienda/detalles/${i.id}`)}
              >
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

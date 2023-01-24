import React, { useEffect } from "react";
import s from "./Home.module.css";

import Slider from "./Slider/Slider";
import InformacionObra from "./InformacionObra/InformacionObra";
import Swiper from "../Swiper/Swiper";
import SobreMi from "./SobreMi/SobreMi";
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosRandomTienda } from "../../redux/actions/actionsShop";

export default function HomePage({ usuario }) {
  const dispatch = useDispatch();
  const productos = useSelector((e) => e.tienda.productosRandom);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(obtenerProductosRandomTienda());
      } catch (e) {
        console.log("Error al obtener productos de la tienda");
      }
    })();

    return () => {
      dispatch(obtenerProductosRandomTienda("reset"));
    };
  }, []);

  return (
    <div className={s.contenedorHome}>
      <Slider />
      <InformacionObra />
      <Swiper usuario={usuario} productos={productos} titulo="Mi tienda" />
      <SobreMi />
    </div>
  );
}

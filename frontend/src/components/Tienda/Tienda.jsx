import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Tienda.module.css";
import Swal from "sweetalert2";
import {
  obtenerCategorias,
  obtenerProductosTienda,
} from "../../redux/actions/actionsShop";
import imgNotFound from "../../assets/images/imgNotFound.jpg";
import TarjetaProducto from "./TarjetaProducto/TarjetaProducto";
import resizeHook from "../../hooks/resizeHook";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import FiltrosLateral from "./FiltrosLateral/FiltrosLateral";
import FiltrosSuperiores from "./FiltrosSuperiores/FiltrosSuperiores";
import Paginado from "./Paginado/Paginado";
import FiltrosMovil from "./FiltrosMovil/FiltrosMovil";

function Tienda({ usuario }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productos = useSelector((e) => e.tienda.productosTienda);
  const totalProductos = useSelector((e) => e.tienda.totalProductos);
  const categorias = useSelector((e) => e.tienda.categorias);
  const { isMobile: esMovil, width: anchoPantalla } = resizeHook();

  const [cargando, setCargando] = useState(false);

  const [filtros, setFiltros] = useState({
    porpag: 6,
    pag: 1,
    price: "all",
    stock: false,
    ordenado: "name",
    orden: "ASC",
    categorias: [],
  });

  function handleFiltros(e) {
    setFiltros({ ...filtros, [e.target.id]: e.target.title });
  }

  async function handleAgregarAlCarro(id, producto) {
    navigate(`/tienda/detalles/${id}`, { producto });
  }

  useEffect(() => {
    (async () => {
      dispatch(obtenerProductosTienda(filtros.porpag, filtros));
    })();
  }, [filtros]);

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        await dispatch(obtenerProductosTienda(6));
        await dispatch(obtenerCategorias());
      } catch (error) {
        Swal.fire(
          "Ups! Hubo problemas!",
          "Intenta nuevamente mas tarde",
          "error"
        );
      }
      setCargando(false);
    })();

    return () => {
      dispatch(obtenerProductosTienda(false));
      dispatch(obtenerCategorias("reset"));
    };
  }, []);

  return (
    <div className={s.contenedorTienda}>
      {cargando ? (
        <Loading />
      ) : (
        <>
          <div className={s.contenedorHeroTienda}>
            <div>Swiper o solo imagen de ofertas?</div>
          </div>
          <div className={s.contenedorSegundoTienda}>
            <div className={s.tituloTienda}>Todos los productos</div>
            {anchoPantalla <= 800 ? (
              <FiltrosMovil
                totalProductos={totalProductos}
                handleFiltros={handleFiltros}
                filtros={filtros}
                setFiltros={setFiltros}
                categorias={categorias}
              />
            ) : null}
            <div className={s.contenedorTerceroTienda}>
              {anchoPantalla > 800 ? (
                <FiltrosLateral
                  filtros={filtros}
                  setFiltros={setFiltros}
                  handleFiltros={handleFiltros}
                  categorias={categorias}
                />
              ) : null}
              <div className={s.contenedorTarjetasFiltros}>
                {anchoPantalla > 800 ? (
                  <FiltrosSuperiores
                    filtros={filtros}
                    setFiltros={setFiltros}
                    cantidadProductos={totalProductos}
                    handleFiltros={handleFiltros}
                  />
                ) : null}
                <div className={s.contenedorTarjetas}>
                  {productos?.length
                    ? productos?.map((i) => {
                        return (
                          <TarjetaProducto
                            key={i.id}
                            imgNotFound={imgNotFound}
                            accionEnHover={() => handleAgregarAlCarro(i.id, i)}
                            esMovil={esMovil}
                            imagen={i.image ? i.image[0] : imgNotFound}
                            id={i.id}
                            nombre={i.name}
                            precio={i.price}
                          />
                        );
                      })
                    : null}
                </div>
                <Paginado
                  totalProductos={totalProductos}
                  handleFiltros={handleFiltros}
                  filtros={filtros}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Tienda;

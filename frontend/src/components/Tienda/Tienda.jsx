import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Tienda.module.css";
import Swal from "sweetalert2";
import { obtenerProductosTienda } from "../../redux/actions/actionsShop";
import imgNotFound from "../../assets/images/imgNotFound.jpg";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsChevronCompactDown } from "react-icons/bs";
import TarjetaProducto from "./TarjetaProducto/TarjetaProducto";
import resizeHook from "../../hooks/resizeHook";
import { useNavigate } from "react-router-dom";

function Tienda({ usuario }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [agregandoProducto, setAgregandoProducto] = useState(false);
  const [filtros, setFiltros] = useState({
    porpag: 6, // 9, 12, 15, 18, 21
    pag: 1,
    price: "all",
    stock: "all",
    ordenPor: "default", // "default", "precio", "nombre", "fecha", "aleatorio", "idProducto"
    orden: "ASC",
  });

  const esMovil = resizeHook().isMobile;
  const productos = useSelector((e) => e.tienda.productosTienda);

  async function handleAgregarAlCarro(id, producto) {
    navigate(`/tienda/detalles/${id}`, { producto });
    // const producto = {
    //   id,
    //   quantity: 1,
    // };
    // try {
    //   if (usuario.username) {
    //     setAgregandoProducto(true);
    //     const token = localStorage.getItem("token");
    //     const agregado = await dispatch();
    //     // agregarProductoCarrito(usuario.id, producto, token)
    //     setAgregandoProducto(false);
    //     if (agregado.mensaje === "stock limit") {
    //       Swal.fire(
    //         "El producto esta en el carrito!",
    //         "Llegaste al limite de unidades",
    //         "info"
    //       );
    //     }
    //   } else {
    //     Swal.fire({
    //       title: "Inicia sesión",
    //       text: "O crea una cuenta para poder comprar",
    //       icon: "warning",
    //       confirmButtonText: "Iniciar sesión",
    //       showCancelButton: true,
    //       cancelButtonText: "Volver",
    //       cancelButtonColor: "red",
    //       showDenyButton: true,
    //       denyButtonText: "Registrarse",
    //       denyButtonColor: "grey",
    //     }).then(({ isConfirmed, isDenied }) => {
    //       if (isConfirmed) {
    //         navigate("/login");
    //       } else if (isDenied) {
    //         navigate("/registrarse");
    //       }
    //     });
    //   }
    // } catch (e) {
    //   Swal.fire(
    //     "Error al cargar el producto!",
    //     "Intentalo nuevamente mas tarde",
    //     "error"
    //   );
    // }
  }

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        await dispatch(obtenerProductosTienda());
      } catch (error) {
        Swal.fire(
          "Ups! Hubo problemas!",
          "Intenta nuevamente mas tarde",
          "error"
        );
      }
      setCargando(false);
    })();
  }, [filtros]);

  return (
    <div className={s.contenedorTienda}>
      <div className={s.contenedorHeroTienda}>
        <div>Swiper o solo imagen de ofertas?</div>
      </div>
      <div className={s.contenedorSegundoTienda}>
        <div className={s.tituloTienda}>Todos los productos</div>
        <div className={s.contenedorTerceroTienda}>
          <div className={s.filtrosLateral}>
            <div className={s.filtrosLateralRenglonTitulo}>
              <GiSettingsKnobs className={s.iconoFiltros} size="22" />
              <div className={s.filtrosLateralTitulo}>Filtros</div>
            </div>
            <div className={s.filtrosLateralSelect}>
              <div className={s.filtrosLateralPrecio}>PRECIO</div>
              <BsChevronCompactDown className={s.filtrosLateralIcono} />
            </div>
            <div className={s.filtrosLateralSelect}>
              <div className={s.filtrosLateralPrecio}>CATEGORIAS</div>
              <BsChevronCompactDown className={s.filtrosLateralIcono} />
            </div>
          </div>
          <div className={s.contenedorTarjetasFiltros}>
            <div className={s.contenedorFiltrosSuperiores}>
              <div className={s.cantidadProductos}>
                {productos?.length} PRODUCTOS
              </div>
              <div>filtros ordenado</div>
              <div>cantidad productos</div>
              <div>ordenado</div>
            </div>
            <div className={s.contenedorTarjetas}>
              {productos?.length
                ? productos?.map((i) => {
                    return (
                      <TarjetaProducto
                        key={i.id}
                        imgNotFound={imgNotFound}
                        agregandoProducto={agregandoProducto}
                        handleAgregarAlCarro={() =>
                          handleAgregarAlCarro(i.id, i)
                        }
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
            <div className={s.paginado}>
              <div className={s.pagina}>1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tienda;

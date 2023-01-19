import React, { useState } from "react";
import s from "./AppBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cerrarSesion } from "../../redux/actions/actionsLogin";
import { BiSearchAlt } from "react-icons/bi";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineMenu,
} from "react-icons/ai";
import MenuHeader from "./MenuHeader/MenuHeader";
import MenuUser from "./MenuUser/MenuUser";
import Swal from "sweetalert2";
import { useEffect } from "react";
import resizeHook from "../../hooks/resizeHook";
import logo from "../../assets/images/logo.png";

export default function AppBar({ usuario }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carrito = useSelector((e) => e.carro?.carro?.CartItems);
  const [cantidadProductosCarrito, setCantidadProductosCarrito] = useState(0);

  const { width: anchoPantalla } = resizeHook();

  const [mostrarMenuHeader, setMostrarMenuHeader] = useState(false);
  const [mostrarMiCuenta, setMostrarMiCuenta] = useState(false);

  // const [buscador, setBuscador] = useState("");
  // function handleBuscar() {
  //   if (buscador.length) {
  //     // dispatch()
  //     console.log("buscando");
  //   } else {
  //     console.log("nada que buscar");
  //   }
  // }

  async function handleCerrarSesion() {
    try {
      Swal.fire({
        icon: "question",
        title: "Seguro desea cerrar sesión?",
        confirmButtonText: "Cerrar",
        showDenyButton: true,
        denyButtonText: "Cancelar",
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          dispatch(cerrarSesion()).then(
            Swal.fire({
              icon: "success",
              title: "Sesión cerrada correctamente!",
              text: "Te esperamos de nuevo!",
            })
          );
          localStorage.removeItem("token");
          navigate("/");
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión!",
        text: "Vuelve a intentarlo!",
      });
    }
  }

  function handleIniciarSesion() {
    navigate("/login");
  }

  function handlerCarrito() {
    if (usuario.username) {
      navigate("/carrito");
    } else {
      Swal.fire({
        title: "Inicia sesión",
        text: "O crea una cuenta para poder comprar",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        showCancelButton: true,
        cancelButtonText: "Volver",
        cancelButtonColor: "red",
        showDenyButton: true,
        denyButtonText: "Registrarse",
        denyButtonColor: "grey",
      }).then(({ isConfirmed, isDenied }) => {
        if (isConfirmed) {
          navigate("/login");
        } else if (isDenied) {
          navigate("/registrarse");
        }
      });
    }
  }

  useEffect(() => {
    let result = 0;
    if (carrito) {
      carrito.forEach((e) => {
        result += e.quantity;
      });
    }
    setCantidadProductosCarrito(result);
  }, [carrito]);

  return (
    <div className={s.contenedorHeader}>
      <div className={s.overflowContenedorHeader}>
        {anchoPantalla <= 800 ? (
          <>
            <AiOutlineMenu
              className={s.botonMenuHeader}
              onClick={() => setMostrarMenuHeader(!mostrarMenuHeader)}
            />

            <MenuHeader
              mostrarMenu={mostrarMenuHeader}
              setMostrarMenu={setMostrarMenuHeader}
              cerrarSesion={handleCerrarSesion}
              usuario={usuario}
            />
          </>
        ) : null}

        {/* <Link to="/" className={s.tituloHeader}> */}
        {/* Melinda Muriel */}
        <img
          className={s.imagenLogo}
          src={logo}
          alt="Melinda Muriel"
          onClick={() => navigate("/")}
        />
        {/* </Link> */}

        <div className={s.contenedorDerecha}>
          <div className={s.contenedorBuscar}>
            <BiSearchAlt className={s.imagenBuscador} />
            <input
              // value={buscador}
              // onKeyDown={(e) => {
              //   if (e.code === "Enter") handleBuscar();
              // }}
              // onChange={(e) => {
              //   setBuscador(e.target.value);
              // }}
              type="text"
              placeholder="Buscar"
              className={s.inputBuscarHeader}
            />
          </div>

          <BiSearchAlt
            className={s.imagenBuscadorTablet}
            onClick={() => setMostrarMenuHeader(true)}
          />

          {/* <select className={s.selectHeader}>
            <option>Español (Latinoaméricano)</option>
            <option>English (U.S)</option>
            <option>Portugues (Europa)</option>
          </select> */}

          <div onClick={handlerCarrito} className={s.contenedorCarritoHeader}>
            <AiOutlineShoppingCart className={s.carritoHeader} />
            <div className={s.cantidadCarritoHeader}>
              {cantidadProductosCarrito}
            </div>
          </div>

          <div
            onClick={
              usuario.username
                ? () => setMostrarMiCuenta(!mostrarMiCuenta)
                : handleIniciarSesion
            }
            className={s.contenedorBotonHeader}
          >
            <div className={s.botonHeader}>
              {usuario.username ? "Mi cuenta" : "Iniciar sesión"}
            </div>
            <AiOutlineUser className={s.iconoUsuarioTablet} />
          </div>
        </div>

        {mostrarMiCuenta && (
          <MenuUser
            setMostrarMiCuenta={setMostrarMiCuenta}
            usuario={usuario}
            handleCerrarSesion={handleCerrarSesion}
          />
        )}
      </div>
    </div>
  );
}

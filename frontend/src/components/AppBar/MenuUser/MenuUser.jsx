import React from "react";
import s from "./MenuUser.module.css";
import { Link } from "react-router-dom";

function MenuUser({ setMostrarMiCuenta, usuario, handleCerrarSesion }) {
  function handleFondoMenuUser(e) {
    if (e.target.id === "fondoMenuUser") setMostrarMiCuenta(false);
  }

  return (
    <div
      id="fondoMenuUser"
      onClick={handleFondoMenuUser}
      className={s.contenedorGralMenuUser}
    >
      <div className={s.contenedorMenuUser}>
        <div className={s.tituloMenuUser}>
          {usuario?.username ? usuario.username : "El Fantasma"}
        </div>

        <Link
          to="/dashboard/client"
          onClick={() => setMostrarMiCuenta(false)}
          className={s.itemMenuUser}
        >
          Mi Perfil
        </Link>

        {usuario.role === "admin" ? (
          <Link
            to="/dashboard/admin"
            onClick={() => setMostrarMiCuenta(false)}
            className={s.itemMenuUser}
          >
            Panel administrador
          </Link>
        ) : null}
        <div
          className={s.itemMenuUser}
          onClick={() => {
            handleCerrarSesion();
            setMostrarMiCuenta(false);
          }}
        >
          Cerrar sesión
        </div>
      </div>
    </div>
  );
}

export default MenuUser;

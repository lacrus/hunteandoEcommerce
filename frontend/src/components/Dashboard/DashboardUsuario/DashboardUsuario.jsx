import React, { useState } from "react";
import s from "./DashboardUsuario.module.css";
import PanelLateralUsusario from "./PanelLateralUsusario/PanelLateralUsusario";
import PanelPerfilUsuario from "./PanelPerfilUsuario/PanelPerfilUsuario";
import PanelComprasUsuario from "./PanelComprasUsuario/PanelComprasUsuario";

export default function DashboardUsuario({ usuario }) {
  const [mostrarMenu, setMostrarMenu] = useState({
    perfil: true,
    compras: false,
  });
  const token = localStorage.getItem("token");
  return (
    <div className={s.contenedorDashboardUsuario}>
      <PanelLateralUsusario
        mostrarMenu={mostrarMenu}
        setMostrarMenu={setMostrarMenu}
      />

      {mostrarMenu.perfil && <PanelPerfilUsuario token={token} usuario={usuario} />}
      {mostrarMenu.compras && <PanelComprasUsuario token={token} usuario={usuario} />}
    </div>
  );
}

import React from "react";
import s from "./PanelComprasUsuario.module.css";
import { CgDetailsMore } from "react-icons/cg";

function PanelComprasUsuario({ token, usuario }) {
  return (
    <div className={s.contenedorPanelComprasUsuario}>
      <div className={s.tituloPanelComprasUsuario}>Mis compras</div>
      <table className={s.tablaPanelComprasUsuario}>
        <thead>
          <tr className={s.encabezadoPanelComprasUsuario}>
            <th>Calle</th>
            <th>Número</th>
            <th>Ciudad</th>
            <th>Provincia</th>
            <th>Modificar</th>
          </tr>
        </thead>

        {usuario.direcciones?.length ? (
          <tbody className={s.bodyPanelComprasUsuario}>
            <tr>
              <th>Calle</th>
              <th>Número</th>
              <th>Ciudad</th>
              <th>Provincia</th>
              <td>
                <div
                  className={s.botonPanelComprasUsuario}
                  // onClick={(e) => handleModificarDireccion(e, a.id)}
                >
                  <CgDetailsMore />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td className={s.renglonVacio}>Sin datos</td>
              <td></td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
}

export default PanelComprasUsuario;

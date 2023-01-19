import React from "react";
import s from "./Paginado.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function Paginado({ totalProductos, handleFiltros, filtros }) {
  const numerosPagina = [];
  for (let i = 0; i < Math.ceil(totalProductos / filtros.porpag); i++) {
    numerosPagina.push(i + 1);
  }
  return (
    <div className={s.contenedorPaginado}>
      <div
        id="pag"
        title={parseInt(filtros.pag) - 1}
        onClick={handleFiltros}
        className={`${s.pagina} ${s.paginaActiva}`}
        style={{ display: filtros.pag <= 1 ? "none" : "flex" }}
      >
        <div id="pag" title={parseInt(filtros.pag) - 1}>{`<`}</div>
      </div>
      {numerosPagina.length
        ? numerosPagina.map((i) => {
            return (
              <div
                key={i}
                id="pag"
                title={i}
                onClick={handleFiltros}
                className={`${s.pagina} ${
                  filtros.pag === i ? s.paginaActiva : null
                }`}
              >
                <div id="pag" title={i}>
                  {i}
                </div>
              </div>
            );
          })
        : null}
      <div
        id="pag"
        title={parseInt(filtros.pag) + 1}
        onClick={handleFiltros}
        style={{
          display: filtros.pag >= numerosPagina.length ? "none" : "flex",
        }}
        className={`${s.pagina} ${s.paginaActiva}`}
      >
        <div id="pag" title={parseInt(filtros.pag) + 1}>{`>`}</div>
      </div>
    </div>
  );
}

export default Paginado;

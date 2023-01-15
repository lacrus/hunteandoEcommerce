import React, { useState } from "react";
import s from "./FiltrosSuperiores.module.css";
import { BsChevronCompactDown } from "react-icons/bs";

function FiltrosSuperiores({
  cantidadProductos,
  filtros,
  setFiltros,
  handleFiltros,
}) {
  const [filtroAbierto, setFiltroAbierto] = useState({
    ordenado: false,
    porpag: false,
    orden: false,
  });

  function handleAbrirFiltro(e, cerrar) {
    if (!cerrar) {
      setFiltroAbierto(() => {
        const cerrados = {
          ordenado: false,
          porpag: false,
          orden: false,
        };

        return {
          ...cerrados,
          [e.target.id]: !filtroAbierto[`${e.target.id}`],
        };
      });
    } else {
      setFiltroAbierto({
        ordenado: false,
        porpag: false,
        orden: false,
      });
    }
  }

  return (
    <div className={s.contenedorFiltrosSuperiores}>
      <div className={s.cantidadProductos}>
        {cantidadProductos || 0} PRODUCTOS
      </div>
      <div className={s.contenedorSelect}>
        <div
          id="ordenado"
          onClick={handleAbrirFiltro}
          className={s.contenedorTituloSelect}
        >
          <div id="ordenado" className={s.tituloSelect}>
            Ordenar por
          </div>
          <BsChevronCompactDown
            id="ordenado"
            className={`${s.filtrosSuperiorIcono} ${
              filtroAbierto.ordenado ? s.filtrosSuperiorIconoAbierto : false
            }`}
          />
        </div>

        <div
          className={`${s.listadoFiltroSuperior} ${
            filtroAbierto.ordenado ? s.listadoFiltroSuperiorMostrar : false
          }`}
        >
          <div
            id="ordenado"
            title="price"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.ordenado === "price" ? s.itemListadoActive : false
            }`}
          >
            Por precio
          </div>
          <div
            id="ordenado"
            title="name"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.ordenado === "name" ? s.itemListadoActive : false
            }`}
          >
            Por nombre
          </div>
          <div
            id="ordenado"
            title="createdAt"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.ordenado === "createdAt" ? s.itemListadoActive : false
            }`}
          >
            Por fecha
          </div>
          <div
            id="ordenado"
            title="id"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.ordenado === "id" ? s.itemListadoActive : false
            }`}
          >
            Por id producto
          </div>
        </div>
      </div>

      <div className={s.contenedorSelect}>
        <div
          id="porpag"
          onClick={handleAbrirFiltro}
          className={s.contenedorTituloSelect}
        >
          <div id="porpag" className={s.tituloSelect}>
            Mostrar
          </div>
          <BsChevronCompactDown
            id="porpag"
            className={`${s.filtrosSuperiorIcono} ${
              filtroAbierto.porpag ? s.filtrosSuperiorIconoAbierto : false
            }`}
          />
        </div>

        <div
          className={`${s.listadoFiltroSuperior} ${
            filtroAbierto.porpag ? s.listadoFiltroSuperiorMostrar : false
          }`}
        >
          <div
            id="porpag"
            title="6"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.porpag == 6 ? s.itemListadoActive : false
            }`}
          >
            6 artículos por pagina
          </div>
          <div
            id="porpag"
            title="9"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.porpag == 9 ? s.itemListadoActive : false
            }`}
          >
            9 artículos por pagina
          </div>
          <div
            id="porpag"
            title="12"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.porpag == 12 ? s.itemListadoActive : false
            }`}
          >
            12 artículos por pagina
          </div>
          <div
            id="porpag"
            title="15"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.porpag == 15 ? s.itemListadoActive : false
            }`}
          >
            15 artículos por pagina
          </div>
          <div
            id="porpag"
            title="18"
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={`${s.itemListado} ${
              filtros.porpag == 18 ? s.itemListadoActive : false
            }`}
          >
            18 artículos por pagina
          </div>
        </div>
      </div>

      <div className={`${s.contenedorSelect} ${s.contenedorTituloSelectOrder}`}>
        <div
          id="orden"
          onClick={handleAbrirFiltro}
          className={`${s.contenedorTituloSelect}`}
        >
          <div id="orden" className={s.tituloSelect}>
            Orden
          </div>
          <BsChevronCompactDown
            id="orden"
            className={`${s.filtrosSuperiorIcono} ${
              filtroAbierto.orden ? s.filtrosSuperiorIconoAbierto : false
            }`}
          />
        </div>
        <div
          className={`${s.listadoFiltroSuperior} ${
            filtroAbierto.orden ? s.listadoFiltroSuperiorMostrar : false
          }`}
        >
          <div
            id="orden"
            title={filtros.orden === "ASC" ? "DESC" : "ASC"}
            onClick={(e) => {
              handleAbrirFiltro(e, true);
              handleFiltros(e);
            }}
            className={s.itemListado}
          >
            {filtros.orden === "ASC" ? "Descendente" : "Ascendente"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FiltrosSuperiores;

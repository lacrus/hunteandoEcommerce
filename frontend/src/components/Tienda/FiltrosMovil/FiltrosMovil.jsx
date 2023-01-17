import React, { useState } from "react";
import s from "./FiltrosMovil.module.css";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsChevronCompactDown } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";

function FiltrosMovil({ totalProductos, handleFiltros, filtros, setFiltros }) {
  const [filtroMovilAbierto, setFiltroMovilAbierto] = useState(false);
  const [filtroAbierto, setFiltroAbierto] = useState({
    ordenado: false,
    porpag: false,
    orden: false,
    categorias: false,
  });

  function handleAbrirFiltro(e, cerrar) {
    if (!cerrar) {
      setFiltroAbierto(() => {
        const cerrados = {
          ordenado: false,
          porpag: false,
          orden: false,
          categorias: false,
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
        categorias: false,
      });
    }
  }

  return (
    <div className={s.contenedorFiltrosMovil}>
      <div
        className={s.contenedorTituloFiltros}
        onClick={() => setFiltroMovilAbierto(!filtroMovilAbierto)}
      >
        <GiSettingsKnobs className={s.iconoFiltrosMobil} size="24" />
        <div className={s.tituloFiltros}> FILTROS</div>
      </div>
      <div className={s.totalProductos}>{totalProductos} Productos</div>

      {/* FILTROS ABIERTOS   */}
      <div
        className={`${s.contenedorTodosFiltros} ${
          filtroMovilAbierto ? s.contenedorTodosFiltrosActivo : null
        }`}
      >
        <div className={s.encabezadoTodosFiltros}>
          <AiOutlineArrowLeft
            onClick={() => setFiltroMovilAbierto(!filtroMovilAbierto)}
            size={50}
            style={{ cursor: "pointer" }}
          />
          <div className={s.tituloTodosFiltros}>Filtrar por</div>
        </div>

        {/* FILTRO STOCK */}
        <div className={`${s.enStockMobil}`}>
          <div style={{ marginRight: "20%", whiteSpace: "nowrap  " }}>
            En Stock
          </div>
          <div
            onClick={() => {
              setFiltros({ ...filtros, stock: !filtros.stock });
            }}
            className={`${s.contenedorBotonMobil} ${
              filtros.stock ? s.contenedorBotonOnMobil : false
            }`}
          >
            <div className={s.bolitaBotonMobil} />
          </div>
        </div>
        {/* FIN FILTRO STOCK */}

        {/* FILTRO ORDENADO */}
        <div className={s.contenedorSelectMobil}>
          <div
            id="ordenado"
            onClick={handleAbrirFiltro}
            className={s.contenedorTituloSelectMobil}
          >
            <div id="ordenado" className={s.tituloSelectMobil}>
              Ordenar por
            </div>
            <BsChevronCompactDown
              id="ordenado"
              className={`${s.filtrosIconoMobil} ${
                filtroAbierto.ordenado ? s.filtrosIconoMobilAbierto : false
              }`}
            />
          </div>

          <div
            className={`${s.listadoFiltroMobil} ${
              filtroAbierto.ordenado ? s.listadoFiltroMobilMostrar : false
            }`}
          >
            <div
              id="ordenado"
              title="price"
              onClick={(e) => {
                handleAbrirFiltro(e, true);
                handleFiltros(e);
              }}
              className={`${s.itemListadoMobil} ${
                filtros.ordenado === "price" ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.ordenado === "name" ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.ordenado === "createdAt"
                  ? s.itemListadoMobilActive
                  : false
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
              className={`${s.itemListadoMobil} ${
                filtros.ordenado === "id" ? s.itemListadoMobilActive : false
              }`}
            >
              Por id producto
            </div>
          </div>
        </div>
        {/* FIN FILTRO ORDENADO */}

        {/* FILTRO CANTIDAD */}
        <div className={s.contenedorSelectMobil}>
          <div
            id="porpag"
            onClick={handleAbrirFiltro}
            className={s.contenedorTituloSelectMobil}
          >
            <div id="porpag" className={s.tituloSelectMobil}>
              Mostrar
            </div>
            <BsChevronCompactDown
              id="porpag"
              className={`${s.filtrosIconoMobil} ${
                filtroAbierto.porpag ? s.filtrosIconoMobilAbierto : false
              }`}
            />
          </div>

          <div
            className={`${s.listadoFiltroMobil} ${
              filtroAbierto.porpag ? s.listadoFiltroMobilMostrar : false
            }`}
          >
            <div
              id="porpag"
              title="6"
              onClick={(e) => {
                handleAbrirFiltro(e, true);
                handleFiltros(e);
              }}
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 6 ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 9 ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 12 ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 15 ? s.itemListadoMobilActive : false
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
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 18 ? s.itemListadoMobilActive : false
              }`}
            >
              18 artículos por pagina
            </div>
          </div>
        </div>
        {/* FIN FILTRO CANTIDAD */}

        {/* FILTRO ORDEN */}
        <div className={`${s.contenedorSelectMobil}`}>
          <div
            id="orden"
            onClick={handleAbrirFiltro}
            className={`${s.contenedorTituloSelectMobil}`}
          >
            <div id="orden" className={s.tituloSelectMobil}>
              Orden
            </div>
            <BsChevronCompactDown
              id="orden"
              className={`${s.filtrosIconoMobil} ${
                filtroAbierto.orden ? s.filtrosIconoMobilAbierto : false
              }`}
            />
          </div>

          <div
            className={`${s.listadoFiltroMobil} ${
              filtroAbierto.orden ? s.listadoFiltroMobilMostrar : false
            }`}
          >
            <div
              id="orden"
              title={filtros.orden === "ASC" ? "DESC" : "ASC"}
              onClick={(e) => {
                handleAbrirFiltro(e, true);
                handleFiltros(e);
              }}
              className={s.itemListadoMobil}
            >
              {filtros.orden === "ASC" ? "Descendente" : "Ascendente"}
            </div>
          </div>
        </div>
        {/* FIN FILTRO ORDEN */}

        {/* FILTRO CATEGORIAS */}
        <div className={`${s.contenedorSelectMobil}`}>
          <div
            id="categorias"
            onClick={handleAbrirFiltro}
            className={s.contenedorTituloSelectMobil}
          >
            <div id="categorias" className={s.tituloSelectMobil}>
              Categorias
            </div>
            <BsChevronCompactDown
              id="categorias"
              className={`${s.filtrosIconoMobil} ${
                filtroAbierto.categorias ? s.filtrosIconoMobilAbierto : false
              }`}
            />
          </div>

          <div
            className={`${s.listadoFiltroMobil} ${
              filtroAbierto.categorias ? s.listadoFiltroMobilMostrar : false
            }`}
          >
            <div
              id="categorias"
              title="categoria1"
              onClick={(e) => {
                handleAbrirFiltro(e, true);
                // handleFiltros(e);
              }}
              className={`${s.itemListadoMobil} ${
                filtros.porpag == 18 ? s.itemListadoMobilActive : false
              }`}
            >
              categoria 1
            </div>
          </div>
        </div>
        {/* FIN FILTRO CATEGORIAS */}
      </div>
    </div>
  );
}

export default FiltrosMovil;

import React, { useState } from "react";
import s from "./FiltrosLateral.module.css";
import { GiSettingsKnobs } from "react-icons/gi";
import { BsChevronCompactDown } from "react-icons/bs";

function FiltrosLateral({ filtros, setFiltros, categorias }) {
  const [filtroAbierto, setFiltroAbierto] = useState({
    price: false,
    categorias: false,
    stock: false,
  });

  function handleSelectCategorias(e) {  
    if (filtros.categorias.includes(e.target.id)) {
      let categoriasFiltradas = filtros.categorias.filter(
        (i) => i !== e.target.id
      );
      setFiltros({ ...filtros, categorias: [...categoriasFiltradas] });
    } else {
      // const categoriaAgregada = [...filtros.categorias, e.target.id];
      setFiltros({
        ...filtros,
        categorias: [...filtros.categorias, e.target.id],
      });
    }
  }

  function handleAbrirFiltro(e) {
    setFiltroAbierto(() => {
      const cerrados = {
        price: false,
        categorias: false,
      };
      return {
        ...cerrados,
        [e.target.id]: !filtroAbierto[`${e.target.id}`],
      };
    });
  }

  return (
    <div className={s.filtrosLateral}>
      <div className={s.filtrosLateralRenglonTitulo}>
        <GiSettingsKnobs className={s.iconoFiltrosLateral} size="22" />
        <div className={s.filtrosLateralTitulo}>Filtros</div>
      </div>
      <div
        className={`${s.listaFiltroLateral} ${
          filtroAbierto.price ? s.listaFiltroLateralAbierta : false
        }`}
      >
        LISTA PRECIOS
      </div>

      <div
        id="categorias"
        className={s.filtrosLateralSelect}
        onClick={handleAbrirFiltro}
      >
        <div id="categorias">CATEGORIAS</div>
        <BsChevronCompactDown
          id="categorias"
          className={`${s.filtrosLateralIcono} ${
            filtroAbierto.categorias ? s.filtrosLateralIconoAbierto : false
          }`}
        />
      </div>
      <div
        className={`${s.listaFiltroLateral} ${
          filtroAbierto.categorias ? s.listaFiltroLateralAbierta : false
        }`}
      >
        {categorias?.map((i, idx) => {
          return (
            <div
              key={i.name}
              id={i.name}
              className={s.contenedorItemCategorias}
              onClick={handleSelectCategorias}
            >
              <div id={i.name} className={s.itemCategorias}>
                {i.name[0].toUpperCase() + i.name.slice(1)}
              </div>
              <div
                id={i.name}
                className={`${s.checkboxItemCategorias} ${
                  filtros.categorias.includes(i.name)
                    ? s.checkboxItemCategoriasActivo
                    : null
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <div className={`${s.enStock}`}>
        <div>En Stock</div>
        <div
          onClick={() => {
            setFiltros({ ...filtros, stock: !filtros.stock });
          }}
          className={`${s.contenedorBoton} ${
            filtros.stock ? s.contenedorBotonOn : false
          }`}
        >
          <div className={s.bolitaBoton} />
        </div>
      </div>
    </div>
  );
}

export default FiltrosLateral;

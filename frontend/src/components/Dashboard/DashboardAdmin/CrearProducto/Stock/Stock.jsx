import React, { useState } from "react";
import s from "./Stock.module.css";

function Stock({ talles, setTalles, errores }) {
  function handleAgregarStock(accion) {
    if (accion === "+") {
      setTalles([...talles, { size: "", color: "", quantity: 0 }]);
    } else {
      if (talles.length > 1) {
        const nuevo = [...talles];
        nuevo.pop();
        setTalles([...nuevo]);
      }
    }
  }

  function handleInputStock(e) {
    let cambio = [...talles];
    cambio[e.target.id.split(":")[1]][e.target.id.split(":")[0]] =
      e.target.value;
    setTalles([...cambio]);
  }

  return (
    <div className={s.contenedorStock}>
      <div className={s.contenedorTituloStock}>
        <div className={s.tituloStock}>Stock por talle y color</div>
        <div className={s.contenedorAgregarStock}>
          <div
            className={s.agregarStock}
            onClick={() => handleAgregarStock("-")}
          >
            -
          </div>
          <div
            className={s.agregarStock}
            onClick={() => handleAgregarStock("+")}
          >
            +
          </div>
        </div>
      </div>
      {talles.map((i, idx) => {
        return (
          <div key={"size" + idx}>
            <div className={s.contenedorIndividualStock}>
              <div className={s.contenedorInputStock}>
                <label
                  className={`${s.labelStock} ${
                    errores[`${idx}`] ? s.labelErrorStock : null
                  } `}
                  htmlFor={"size" + idx}
                >
                  Elige el tamaño
                </label>
                <select
                  className={`${s.selectStock} ${
                    errores[`${idx}`] ? s.inputErrorStock : null
                  } `}
                  name={"size:" + idx}
                  id={"size:" + idx}
                  onChange={handleInputStock}
                >
                  <option
                    value=""
                    disabled={talles[idx].size.length ? true : false}
                  >
                    Talles
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="XXXL">XXXL</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="6">6</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                  <option value="12">12</option>
                  <option value="14">14</option>
                  <option value="16">16</option>
                  <option value="18">18</option>
                  <option value="Medidas">Medidas</option>
                </select>
              </div>

              <div className={s.contenedorInputStock}>
                <label
                  className={`${s.labelStock} ${
                    errores[`${idx}`] ? s.labelErrorStock : null
                  } `}
                  htmlFor={"color" + idx}
                >
                  Introduce el color
                </label>
                <input
                  onChange={handleInputStock}
                  className={`${s.inputStock} ${
                    errores[`${idx}`] ? s.inputErrorStock : null
                  } `}
                  type="text"
                  name={"color:" + idx}
                  id={"color:" + idx}
                />
              </div>

              <div className={s.contenedorInputStock}>
                <label
                  className={`${s.labelStock} ${
                    errores[`${idx}`] ? s.labelErrorStock : null
                  } `}
                  htmlFor={"quantity" + idx}
                >
                  Introduce la cantidad
                </label>
                <input
                  onChange={handleInputStock}
                  className={`${s.inputStock} ${
                    errores[`${idx}`] ? s.inputErrorStock : null
                  } `}
                  type="number"
                  name={"quantity:" + idx}
                  id={"quantity:" + idx}
                  min="0"
                />
              </div>
            </div>
            <div className={errores[`${idx}`] ? s.errorStock : null}>
              {errores[`${idx}`]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Stock;

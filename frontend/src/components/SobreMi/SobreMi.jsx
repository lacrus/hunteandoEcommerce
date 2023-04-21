import React from "react";
import s from "./SobreMi.module.css";
import logoFlor from "../../assets/images/logoFlor.png";
import sobremi1 from "../../assets/images/sobremi1.png";
import sobremi2 from "../../assets/images/sobremi2.png";

function SobreMi({}) {
  return (
    <div className={s.SobreMiContenedor}>
      <img src={logoFlor} alt="logo" className={s.imgLogo} />
      <div className={s.tituloSobreMi}>Melinda Muriel</div>
      <div className={s.uno}>
        <img src={sobremi1} alt="sobre mi" className={s.img1} />
        <div className={s.texto1}>
          Melisa Mariel Aguirre Sotelo, artista experimental usa como seudónimo
          Melinda Muriel, una leve deformación de sus dos nombres, con la que la
          apodó una amiga para nombrarla en su faceta artística. Además de
          pintar y dibujar es terapeuta no verbal y comunicadora social. Nacida
          en Quitilipi, una ciudad del centro de la provincia del Chaco.
          Actualmente vive en Resistencia, capital de la provincia. Pinta desde
          que sus manos fueron capaces de usar pinceles, por y gracias a su
          madre, que en sus tardes de arte la sentaba al lado suyo con telas y
          pinceles en la mesa. Si bien su convite y obra eran sobre tela, el
          arte de Melinda Muriel es una constante exploración sobre papel. Como
          la pintura y más tarde el dibujo la acompañaron siempre, su estilo ha
          mutado tanto como la vida, hasta llegar a los que hoy podría llamarse
          su estilo. En un viaje por Cuba, en el que andábamos con la mochila y
          lo puesto a cuestas, me acompañaban solo una bitácora A5 con papel
          para de gramaje grueso para dibujar y una cajita de microfibras
          Statler. El espacio fue condicionante para desarrollar su estilo,
          pequeños universos empezaron a formarse en las hojas de 16 por 21 cm,
          llenos de color y detalles cada vez más numerosos y en miniatura que
          recogían el paisaje y el entorno sonoro y sensorial que la rodeaba,
          así como el proceso inconciente de pensamientos. Usa estilografos para
          dibujar para que la tinta no se corra, de ese modo su combina sus
          trazos con tintas, agua y pincel. Son las tintas las que le dan
          estridencia y transparencia a sus pinturas y el estilógrafo 0.05, y al
          pincel 00 permiten el detalle.
        </div>
      </div>
      <div className={s.uno}>
        <div className={s.texto1}>
          <div className={s.tituloSobreMi}>Estilo</div>
          <div className={s.texto2}>
            Amo los colores, tanto como la multiplicidad, por eso en mis dibujos
            se pueden ver infinitos mundos si se los observa con detenimiento.
            En una misma obra existen varias a la vez, universos paralelos en
            una sola dimensión que es la hoja. Los colores muy pocas veces se
            repiten porque para cada espacio varía la combinación de tono que
            elijo, así como la cantidad de agua con la que lo mezclo.
          </div>
        </div>
        <img src={sobremi2} alt="sobre mi" className={s.img1} />
      </div>

      <div className={s.tituloSobreMi}>Obras</div>
      <div className={s.uno}>
        <div className={s.texto1}>
          <div>
            La multiplicidad y lo paralelo, mundos, ciudades, universos
            oníricos, personas con gran detalle, en donde el sentido se
            encuentra deteniéndose por unos instantes a mirar. La contemplación
            del otre termina por crear el sentido. El arte de Melinda Muriel es
            la representación del pensamiento fusionado con el entorno, con el
            paisaje visual, sonoro, energético y espiritual por lo tanto con el
            estado de ánimo.
          </div>
        </div>

        <div className={s.texto1}>
          Para ella el arte es esa combinación sensorial y de pensamientos
          conscientes e inconscientes. El proceso del inconsciente reflejado en
          el papel al dejar fluir el trazo, atravesado por el contexto mediato o
          inmediato, sus colores, y sonoridades. Usa colores intensos y
          contrastantes. En parte por un gusto personal con la intensidad, pero
          también por el material que usa ya que la tinta de gel tiene muchos
          fluorescentes , al igual que la tinta china con su pigmentos potentes.
        </div>
      </div>
    </div>
  );
}

export default SobreMi;

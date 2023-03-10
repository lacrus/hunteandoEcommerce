import React from "react";
import s from "./Slider.module.css";

// import img1 from "../../../assets/images/banner1.png";
// import img2 from "../../../assets/images/banner2.png";
// import img3 from "../../../assets/images/banner3.png";
// import img4 from "../../../assets/images/banner4.png";
import img1 from "../../../assets/images/banner1.jpg";
import img2 from "../../../assets/images/banner2.jpg";
import img3 from "../../../assets/images/banner3.jpg";
import img4 from "../../../assets/images/banner4.jpg";
import imgNotFound from "../../../assets/images/imgNotFound.jpg";

export default function Slider() {
  const onError = ({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = imgNotFound;
  };

  return (
    <div className={s.contenedorSlider}>
      <div className={s.slider}>
        <ul>
          <li id="slide1">
            <img src={img1} alt="img1" onError={onError} />
          </li>
          <li id="slide2">
            <img src={img2} alt="img2" onError={onError} />
          </li>
          <li id="slide3">
            <img src={img3} alt="img3" onError={onError} />
          </li>
          <li id="slide4">
            <img src={img4} alt="img4" onError={onError} />
          </li>
        </ul>
      </div>
    </div>
  );
}

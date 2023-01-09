import React, { useState, useEffect } from "react";

export default function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    isMobile: undefined,
  });
  useEffect(() => {
    function handleResize() {
      if (
        navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPod/i) ||
        navigator.userAgent.match(/BlackBerry/i) ||
        navigator.userAgent.match(/Windows Phone/i)
      ) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: true,
        });
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isMobile: false,
        });
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

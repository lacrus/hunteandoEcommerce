import React from "react";
import { MoonLoader } from "react-spinners";

function Loading() {
  const override = {
    display: "block",
    margin: "0 auto",
    // borderColor: "red",
  };
  return (
    <MoonLoader
      color={"#F99716"}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}

export default Loading;

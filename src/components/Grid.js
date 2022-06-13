import React, {useContext } from "react";
import { gridContext } from "../context/gridContext";
export default function Grid() {
  const [gridJSX] = useContext(gridContext)
  return (
    <>
      <div id="table">
        <div id="tbody">{gridJSX}</div>
      </div>
    </>
  );
}

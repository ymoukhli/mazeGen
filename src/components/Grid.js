import React, { useState, useEffect } from "react";
import createGrid from "../utils/createGrid";
export default function Grid() {
  const [grid, setGrid] = useState(createGrid(10, 10));
  const [gridJSX, setGridJSX] = useState("");
  useEffect(() => {
    setGridJSX(
      grid.map((e, y) => (
        <div className="row" key={`row_${y}`}>
          {e.map((e, x) => (
            <div key={`cell${y}_${x}`} className="cell" id={`${y}_${x}`}></div>
          ))}
        </div>
      ))
    );
  }, [grid]);
  return (
    <>
      <div id="table">
        <div id="tbody">{gridJSX}</div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useAlgo } from "../hooks/useAlgo";
import createGrid from "../utils/createGrid";
export default function Grid({gridJSX}) {
  return (
    <>
      <div id="table">
        <div id="tbody">{gridJSX}</div>
      </div>
    </>
  );
}

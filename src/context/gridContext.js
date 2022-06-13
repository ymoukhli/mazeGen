import { useAlgo } from "../hooks/useAlgo";
import React, { createContext } from "react";

export const gridContext = createContext();
export const GridProvider = ({children}) => {
    const algo = useAlgo();
    return (
        <gridContext.Provider value={algo}>
        {children}
        </gridContext.Provider>
    )
}
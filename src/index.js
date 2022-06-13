import React, { useContext } from "react";
import "../style.css";
import { createRoot } from "react-dom/client";
import { gridContext, GridProvider } from "./context/gridContext";
// import App from './components/App';
import MainPage from "./components/MainPage";
const root = createRoot(document.getElementById("root"));


const App = () => {
  console.log('setting app')
  return (
    <GridProvider>
      <MainPage/>;
    </GridProvider>
  );
};
root.render(<App />);

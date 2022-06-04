import React from "react";
import "../style.css";
import { createRoot } from "react-dom/client";
import Grid from "./components/Grid";
// import App from './components/App';

const root = createRoot(document.getElementById("root"));
const App = () => {
  return (
    <>
      <Grid></Grid>
    </>
  );
};
root.render(<App />);

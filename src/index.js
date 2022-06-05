import React from "react";
import "../style.css";
import { createRoot } from "react-dom/client";
import Grid from "./components/Grid";
import Button from "./components/Button";
// import App from './components/App';

const root = createRoot(document.getElementById("root"));
const App = () => {
  return (
    <>
      <main>
        <Grid></Grid>
        <Button>generate maze</Button>
      </main>
      <aside>
        <Button>prim</Button>
        <Button>hunt and kill</Button>
        <Button>back track</Button>
        <Button>eller</Button>
      </aside>
    </>
  );
};
root.render(<App />);

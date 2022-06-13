import React, { useContext } from "react";
import "../style.css";
import { createRoot } from "react-dom/client";
import styeld from "styled-components";
import Grid from "./components/Grid";
import Button from "./components/Button";
import { useAlgo } from "./hooks/useAlgo";
import { gridContext, GridProvider } from "./context/gridContext";
// import App from './components/App';
import { Header } from "./components/Header";
const root = createRoot(document.getElementById("root"));

const StyledApp = styeld.div`
    display: felx;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin-top : 62px;
        }
        margin-top: 120px;
    }
    .algos {

    }
`;
const App = () => {
  console.log('setting app')
  return (
    <GridProvider>
      <MainPage/>;
    </GridProvider>
  );
};

function MainPage() {
  console.log('setting MainPage')
  return (
  <StyledApp>
  <main>
    <Grid></Grid>
    {/* <Button onClick={generateMaze} width="441">
      generate maze
    </Button> */}
  </main>
  <Header/>
</StyledApp>)
}
root.render(<App />);

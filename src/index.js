import React from "react";
import "../style.css";
import { createRoot } from "react-dom/client";
import styeld from "styled-components";
import Grid from "./components/Grid";
import Button from "./components/Button";
import { useAlgo } from "./hooks/useAlgo";
// import App from './components/App';

const root = createRoot(document.getElementById("root"));

const StyledApp = styeld.div`
    display: felx;
    // flex-direction: row;
    justify-content: start;

    main {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        button {
            margin-top : 62px;
        }
    }
    aside {
        width: 30%;
        display: flex;
        flex-direction: column;
        margin-top: 163px;
        button {
            margin-bottom: 97px;
        }
    }
`;
const App = () => {
  const [gridJSX, setAlgo, generateMaze] = useAlgo("prim");

  return (
    <StyledApp>
      <main>
        <Grid gridJSX={gridJSX}></Grid>
        <Button onClick={generateMaze} width="441">
          generate maze
        </Button>
      </main>
      <aside>
        <Button onClick={() => setAlgo("prim")}>prim</Button>
        <Button onClick={() => setAlgo("huntAndKill")}>hunt and kill</Button>
        <Button onClick={() => setAlgo("backTrack")}>back track</Button>
        <Button onClick={() => setAlgo("ellerMaze")}>eller</Button>
      </aside>
    </StyledApp>
  );
};
root.render(<App />);

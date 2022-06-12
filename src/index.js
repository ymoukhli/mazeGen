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
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        display: flex;
        height: 100px;
        button {
          width: 100%;
          border-radius: 0;
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
      <div className="algos">
        <Button onClick={() => generateMaze("prim")}>prim</Button>
        <Button onClick={() => generateMaze("huntAndKill")}>
          hunt and kill
        </Button>
        <Button onClick={() => generateMaze("backTrack")}>back track</Button>
        <Button onClick={() => generateMaze("ellerMaze")}>eller</Button>
      </div>
    </StyledApp>
  );
};
root.render(<App />);

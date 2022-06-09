import createGrid from "../utils/createGrid";
import React, { useEffect, useState } from "react";
import Cell from "../components/Cell";

const width = 10;
const height = 10;
const gridColorRed = "#740178";
const gridColorPick = "#f5af19";
let interval = null;
const validExits = ["right", "bottom", "left", "top"];

export const useAlgo = () => {
  const [grids, setGrid] = useState(createGrid(width, height));
  const [gridJSX, setGridJSX] = useState("");
  const [algo, setAlgo] = useState("ellerMaze");
  useEffect(() => {
    setGridJSX(
      grids.map((e, y) => (
        <div className="row" key={`row_${y}`}>
          {e.map((e, x) => (
            <Cell key={`cell${y}_${x}`} id={`${y}_${x}`} cell={e} />
          ))}
        </div>
      ))
    );
  }, [grids]);
  useEffect(() => {
    clearInterval(interval);
    setGrid(createGrid(width, height));
    if (
      !Boolean(
        ["ellerMaze", "prim", "huntAndKill", "backTrack"].find(
          (e) => e === algo
        )
      )
    ) {
      console.log(`algo name : ${algo} not found fall back to prim algo`);
      setAlgo("prim");
    }
  }, [algo]);
  const getFrontiers = (grid, y, x, frontiers) => {
    // get right
    const arr = JSON.parse(JSON.stringify(frontiers));
    if (x < width - 1 && grid[y][x + 1].color != gridColorRed) {
      grid[y][x + 1].nearleft = true;
      if (grid[y][x + 1].color == "white") arr.push(grid[y][x + 1]);
      grid[y][x + 1].color = gridColorPick;
    }
    // get left

    if (x > 0 && grid[y][x - 1].color != gridColorRed) {
      grid[y][x - 1].nearright = true;
      if (grid[y][x - 1].color == "white") arr.push(grid[y][x - 1]);
      grid[y][x - 1].color = gridColorPick;
    }
    // get bottom
    if (y < height - 1 && grid[y + 1][x].color != gridColorRed) {
      grid[y + 1][x].neartop = true;
      if (grid[y + 1][x].color == "white") arr.push(grid[y + 1][x]);
      grid[y + 1][x].color = gridColorPick;
    }
    // get top
    if (y > 0 && grid[y - 1][x].color != gridColorRed) {
      grid[y - 1][x].nearbottom = true;
      if (grid[y - 1][x].color == "white") arr.push(grid[y - 1][x]);
      grid[y - 1][x].color = gridColorPick;
    }
    return arr;
  };
  const getRandom = (instructionArray) =>
    Math.floor(Math.random() * instructionArray.length);

  const mergeFrontiers = (grid, cell) => {
    const arrInstruction = [];
    if (cell.nearleft) arrInstruction.push("left");
    if (cell.nearright) arrInstruction.push("right");
    if (cell.neartop) arrInstruction.push("top");
    if (cell.nearbottom) arrInstruction.push("bottom");

    const instruction =
      arrInstruction[Math.floor(Math.random() * arrInstruction.length)];
    console.log(`(${cell.y}, ${cell.x})`);
    if (instruction == "left") {
      grid[cell.y][cell.x]["border-left"] = false;
      grid[cell.y][cell.x].color = gridColorRed;
      grid[cell.y][cell.x - 1]["border-right"] = false;
    }
    if (instruction == "right") {
      grid[cell.y][cell.x]["border-right"] = false;
      grid[cell.y][cell.x].color = gridColorRed;
      grid[cell.y][cell.x + 1]["border-left"] = false;
    }
    if (instruction == "bottom") {
      grid[cell.y][cell.x]["border-bottom"] = false;
      grid[cell.y][cell.x].color = gridColorRed;
      grid[cell.y + 1][cell.x]["border-top"] = false;
    }
    if (instruction == "top") {
      grid[cell.y][cell.x]["border-top"] = false;
      grid[cell.y][cell.x].color = gridColorRed;
      grid[cell.y - 1][cell.x]["border-bottom"] = false;
    }
  };
  const paintRow = (grid, y, color) => {
    for (let i = 0; i < width; i++) {
      grid[y][i].color = color ? color : grid[y][i]["background-color"];
    }
  };
  const lookForBranch = (grid, j) => {
    for (let i = 0; i < width; i++) {
      // nodes[j][i].style["background-color"] = gridColorPick;
      if (grid[j][i]["background-color"] === "white") {
        const direction = getActions(grid, j, i, gridColorRed);
        if (direction) {
          switch (direction) {
            case "right":
              return [j, i + 1];
            case "left":
              return [j, i - 1];
            case "bottom":
              return [j + 1, i];
            case "top":
              return [j - 1, i];
          }
        }
      }
    }
    return [-1, -1];
  };
  const openRigthPath = (grid, i, j) => {
    if (
      i < width - 1 &&
      j > 0 &&
      grid[j - 1][i].set === grid[j - 1][i + 1].set &&
      grid[j - 1][i].set === grid[j][i + 1].set
    )
      return false;
    return Math.random() > 0.5;
  };
  const openDownPath = (grid, i, j) => {
    if (
      i > 0 &&
      j < height - 1 &&
      grid[j][i - 1].set === grid[j][i].set &&
      grid[j + 1][i - 1].set == grid[j][i].set
    )
      return false;
    return Math.random() > 0.5;
  };
  const clearTop = (grid, y, x) => {
    grid[y - 1][x]["border-bottom"] = false;
    grid[y][x]["border-top"] = false;
    grid[y - 1][x].set = grid[y][x].set;
    grid[y - 1][x].bottom = true;
    grid[y][x].top = true;
  };
  const clearRight = (grid, y, x) => {
    grid[y][x + 1]["border-left"] = false;
    grid[y][x]["border-right"] = false;
    grid[y][x + 1].set = grid[y][x].set;
    grid[y][x + 1].left = true;
    grid[y][x].right = true;
  };
  const clearDown = (grid, y, x) => {
    grid[y + 1][x]["border-top"] = false;
    grid[y + 1][x].color = "#f5af19";
    grid[y][x]["border-bottom"] = false;
    grid[y + 1][x].set = grid[y][x].set;
    grid[y][x].bottom = true;
    grid[y + 1][x].top = true;
  };
  const getActions = (grid, y, x, color) => {
    const instructions = [];
    if (x > 0 && grid[y][x - 1]["background-color"] === color) {
      instructions.push("left");
    }
    if (x < width - 1 && grid[y][x + 1]["background-color"] === color) {
      instructions.push("right");
    }
    if (y < height - 1 && grid[y + 1][x]["background-color"] === color) {
      instructions.push("bottom");
    }
    if (y > 0 && grid[y - 1][x]["background-color"] === color) {
      instructions.push("top");
    }
    return instructions[Math.floor(Math.random() * instructions.length)];
  };
  function* primMaze(grids, width, height) {
    let frontiers = [];
    const grid = JSON.parse(JSON.stringify(grids));
    console.log(grid);
    // pick random cell
    let currentCellx = Math.floor(Math.random() * width);
    let currentCelly = Math.floor(Math.random() * height);
    // @@color currecnt cell
    grid[currentCelly][currentCellx].color = gridColorRed;
    frontiers = getFrontiers(grid, currentCelly, currentCellx, frontiers);
    yield grid;
    // pick random cell then repeate;
    while (frontiers.length > 0) {
      let frontierIndex = Math.floor(Math.random() * frontiers.length);
      // merge frontier

      mergeFrontiers(grid, frontiers[frontierIndex]);
      let y = frontiers[frontierIndex].y;
      let x = frontiers[frontierIndex].x;
      frontiers.splice(frontierIndex, 1);
      yield grid;

      frontiers = getFrontiers(grid, y, x, frontiers);
      yield grid;
    }
  }
  function* HunteAndkill(grids, width, height) {
    const grid = JSON.parse(JSON.stringify(grids));

    // pick random cell
    let currentCellx = Math.floor(Math.random() * width);
    let currentCelly = Math.floor(Math.random() * height);
    // color currecnt cell

    while (true) {
      yield grid;
      grid[currentCelly][currentCellx].color = gridColorRed;
      grid[currentCelly][currentCellx]["background-color"] = gridColorRed;

      const instruction = getActions(grid, currentCelly, currentCellx, "white");

      if (!instruction) {
        let donne = false;
        for (let k = 0; k < height; k++) {
          if (k != 0) paintRow(grid, k - 1);
          paintRow(grid, k, gridColorPick);
          yield grid;
          [currentCelly, currentCellx] = lookForBranch(grid, k);
          if (currentCelly !== -1) {
            paintRow(grid, k);
            yield grid;
            donne = true;
            break;
          }
        }
        if (donne) continue;
        paintRow(grid, height - 1);
        yield grid;
        console.log("donne");
        break;
      }
      if (instruction === "right") {
        grid[currentCelly][currentCellx]["border-right"] = false;
        grid[currentCelly][currentCellx + 1]["border-left"] = false;
        currentCellx++;
      }
      if (instruction === "left") {
        grid[currentCelly][currentCellx]["border-left"] = false;
        grid[currentCelly][currentCellx - 1]["border-right"] = false;
        currentCellx--;
      }
      if (instruction === "bottom") {
        grid[currentCelly][currentCellx]["border-bottom"] = false;
        grid[currentCelly + 1][currentCellx]["border-top"] = false;
        currentCelly++;
      }
      if (instruction === "top") {
        grid[currentCelly][currentCellx]["border-top"] = false;
        grid[currentCelly - 1][currentCellx]["border-bottom"] = false;
        currentCelly--;
      }
    }
  }
  function* backTrack(grids, width, height) {
    const grid = JSON.parse(JSON.stringify(grids));

    // pick random cell
    let currentCellx = Math.floor(Math.random() * width);
    let currentCelly = Math.floor(Math.random() * height);
    // color currecnt cell
    let pathHistory = [];
    while (true) {
      yield grid;
      if (grid[currentCelly][currentCellx].color !== gridColorRed) {
        grid[currentCelly][currentCellx].color = gridColorRed;
        grid[currentCelly][currentCellx]["background-color"] = gridColorRed;
        pathHistory.push([currentCelly, currentCellx]);
      }
      const instruction = getActions(grid, currentCelly, currentCellx, "white");

      if (!instruction) {
        //back track logic
        if (pathHistory.length == 0) break;
        [currentCelly, currentCellx] = pathHistory.pop();
        continue;
      }
      if (instruction === "right") {
        grid[currentCelly][currentCellx]["border-right"] = false;
        grid[currentCelly][currentCellx + 1]["border-left"] = false;
        currentCellx++;
      }
      if (instruction === "left") {
        grid[currentCelly][currentCellx]["border-left"] = false;
        grid[currentCelly][currentCellx - 1]["border-right"] = false;
        currentCellx--;
      }
      if (instruction === "bottom") {
        grid[currentCelly][currentCellx]["border-bottom"] = false;
        grid[currentCelly + 1][currentCellx]["border-top"] = false;
        currentCelly++;
      }
      if (instruction === "top") {
        grid[currentCelly][currentCellx]["border-top"] = false;
        grid[currentCelly - 1][currentCellx]["border-bottom"] = false;
        currentCelly--;
      }
    }
  }
  function* ellerMaze(grids, width, height) {
    const grid = JSON.parse(JSON.stringify(grids));
    for (let j = 0; j < height; j++) {
      let rowSets = {};
      for (let i = 0; i < width; i++) {
        let setId = grid[j][i].set;
        grid[j][i].color = "#f12711";

        if (!rowSets[setId]) rowSets[setId] = [];
        rowSets[setId].push(grid[j][i]);
        if (openRigthPath(grid, i, j) && i != width - 1) {
          clearRight(grid, j, i);
          yield grid;
        }
      }
      if (j < height - 1) {
        let rowKeys = Object.keys(rowSets);
        for (let keyIndex = 0; keyIndex < rowKeys.length; keyIndex++) {
          let key = rowKeys[keyIndex];
          let rowSetsLength = rowSets[key].length;
          let connected = false;
          for (let k = 0; k < rowSetsLength; k++) {
            let x = rowSets[key][k].x;
            let y = rowSets[key][k].y;
            if (openDownPath(grid, x, y) || rowSetsLength === 1) {
              connected = true;
              clearDown(grid, y, x);
              yield grid;
            }
          }
          if (!connected) {
            let x = rowSets[key][rowSetsLength - 1].x;
            let y = rowSets[key][rowSetsLength - 1].y;
            clearDown(grid, y, x);
            yield grid;
          }
        }
      } else {
        let rowKeys = Object.keys(rowSets);
        for (let keyIndex = 0; keyIndex < rowKeys.length; keyIndex++) {
          let key = rowKeys[keyIndex];
          let x = rowSets[key][rowSets[key].length - 1].x;
          let y = j;
          if (!grid[y][x].top && !grid[y][x].right && x < width - 1) {
            if (Math.random() > 0.5) {
              clearRight(grid, y, x);
              yield grid;
            } else {
              clearTop(grid, y, x);
              yield grid;
            }
          } else if (!grid[y][x].top) {
            clearTop(grid, y, x);
            yield grid;
          } else if (!grid[y][x].right && x < width - 1) {
            clearRight(grid, y, x);
            yield grid;
          }
        }
      }
    }
    clearInterval(interval);
    console.log("done");
  }
  const generateMaze = () => {
    if (interval) clearInterval(interval);
    const grid = createGrid(width, height);
    setGrid(grid);
    let alg = null;
    if (algo === "prim") alg = primMaze(grid, width, height);
    if (algo === "huntAndKill") alg = HunteAndkill(grid, width, height);
    if (algo === "backTrack") alg = backTrack(grid, width, height);
    if (algo === "ellerMaze") alg = ellerMaze(grid, width, height);
    interval = setInterval(() => {
      const val = alg.next();
      console.log("settg grid");
      setGrid((prev) => {
        if (val.value) {
          return JSON.parse(JSON.stringify(val.value));
        } else {
          console.log("done");
          clearInterval(interval);
          return prev;
        }
      });
    }, 20);
  };
  return [gridJSX, setAlgo, generateMaze];
};

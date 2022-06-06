import createGrid from "../utils/createGrid";
import React, { useEffect, useState } from "react";

const width = 50;
const height = 50;
const gridColorRed = "#f12711";
const gridColorPick = "#f5af19";
const frontiers = [];

export const useAlgo = (algo) => {
    const [grid, setGrid] = useState(createGrid(10, 10));
    const [gridJSX, setGridJSX] = useState("");
    let interval = null;
    useEffect(() => {
        console.log(grid);
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


    const getFrontiers = (grid, y, x) => {
        // get right
        if (x < width - 1 && grid[y][x + 1].color != gridColorRed) {
          grid[y][x + 1].nearleft = true;
          if (grid[y][x + 1].color == "white") frontiers.push(grid[y][x + 1]);
        //   nodes[y][x + 1].style["background-color"] = gridColorPick;
          grid[y][x + 1].color = gridColorPick;
        }
        // get left
      
        if (x > 0 && grid[y][x - 1].color != gridColorRed) {
          grid[y][x - 1].nearright = true;
          if (grid[y][x - 1].color == "white") frontiers.push(grid[y][x - 1]);
        //   nodes[y][x - 1].style["background-color"] = gridColorPick;
          grid[y][x - 1].color = gridColorPick;
        }
        // get bottom
        if (y < height - 1 && grid[y + 1][x].color != gridColorRed) {
          grid[y + 1][x].neartop = true;
          if (grid[y + 1][x].color == "white") frontiers.push(grid[y + 1][x]);
        //   nodes[y + 1][x].style["background-color"] = gridColorPick;
          grid[y + 1][x].color = gridColorPick;
        }
        // get top
        if (y > 0 && grid[y - 1][x].color != gridColorRed) {
          grid[y - 1][x].nearbottom = true;
          if (grid[y - 1][x].color == "white") frontiers.push(grid[y - 1][x]);
        //   nodes[y - 1][x].style["background-color"] = gridColorPick;
          grid[y - 1][x].color = gridColorPick;
        }
    };
    const mergeFrontiers = (cell) => {
    const arrInstruction = [];
    if (cell.nearleft) arrInstruction.push("left");
    if (cell.nearright) arrInstruction.push("right");
    if (cell.neartop) arrInstruction.push("top");
    if (cell.nearbottom) arrInstruction.push("bottom");
    
    const instruction =
        arrInstruction[Math.floor(Math.random() * arrInstruction.length)];
    if (instruction == "left") {
        // nodes[cell.y][cell.x].style["border-left"] = "none";
        // nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x - 1].style["border-right"] = "none";
    }
    if (instruction == "right") {
        // nodes[cell.y][cell.x].style["border-right"] = "none";
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
        // nodes[cell.y][cell.x + 1].style["border-left"] = "none";
    }
    if (instruction == "bottom") {
        // nodes[cell.y][cell.x].style["border-bottom"] = "none";
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
        // nodes[cell.y + 1][cell.x].style["border-top"] = "none";
    }
    if (instruction == "top") {
        // nodes[cell.y][cell.x].style["border-top"] = "none";
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
        // nodes[cell.y - 1][cell.x].style["border-bottom"] = "none";
    }
    };
    function* primMaze(grids, width, height) {
        const grid = grids.map(e => e.map(({...e})));
        // pick random cell
        let currentCellx = Math.floor(Math.random() * width);
        let currentCelly = Math.floor(Math.random() * height);
        // @@color currecnt cell
        // nodes[currentCelly][currentCellx].style["background-color"] = gridColorRed;
        grid[currentCelly][currentCellx].color = gridColorRed;
        getFrontiers(grid, currentCelly, currentCellx);
        yield grid;
        // pick random cell then repeate;
        while (frontiers.length > 0) {
          let frontierIndex = Math.floor(Math.random() * frontiers.length);
          // merge frontier
      
          mergeFrontiers(frontiers[frontierIndex]);
          let y = frontiers[frontierIndex].y;
          let x = frontiers[frontierIndex].x;
          frontiers.splice(frontierIndex, 1);
          yield grid;
      
          getFrontiers(grid, y, x);
          yield grid;
        }
    }

    const generateMaze = () => {
        console.log('here')
        if (interval) clearInterval(interval);
        const alg = primMaze(grid,10,10);
        interval = setInterval(() => {
            setGrid(prev => {
            const val = alg.next().value;
            if (val){
                return val
            }
            else {
                clearInterval(interval);
                return prev;
            }
            });
        }, 100);
    }
    const newAlgo = (algo) => {
        setGrid(createGrid(10,10));
        if (interval) clearInterval(interval);
    }
    return [gridJSX, newAlgo, generateMaze];
}
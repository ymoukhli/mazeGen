import createGrid from "../utils/createGrid";
import React, { useEffect, useState } from "react";
import Cell from '../components/Cell'

const width = 10;
const height = 10;
const gridColorRed = "#f12711";
const gridColorPick = "#f5af19";
const frontiers = [];

export const useAlgo = (algo) => {
    const [grids, setGrid] = useState(createGrid(10, 10));
    const [gridJSX, setGridJSX] = useState("");
    let interval = null;
    useEffect(() => {
        console.log("setting gridJSX");
      setGridJSX(
        grids.map((e, y) => (
          <div className="row" key={`row_${y}`}>
            {e.map((e, x) => (
              <Cell key={`cell${y}_${x}`} id={`${y}_${x}`} cell={e}/>
            ))}
          </div>
        ))
      );
    }, [grids]);


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
    const mergeFrontiers = (grid, cell) => {
    const arrInstruction = [];
    if (cell.nearleft) arrInstruction.push("left");
    if (cell.nearright) arrInstruction.push("right");
    if (cell.neartop) arrInstruction.push("top");
    if (cell.nearbottom) arrInstruction.push("bottom");
    
    const instruction =
        arrInstruction[Math.floor(Math.random() * arrInstruction.length)];
        console.log(`(${cell.y}, ${cell.x})`)
    if (instruction == "left") {
        grid[cell.y][cell.x]["border-left"] = false;
        // nodes[cell.y][cell.x]["background-color"] = gridColorRed;
        grid[cell.y][cell.x].color = gridColorRed;
        grid[cell.y][cell.x - 1]["border-right"] = false;
    }
    if (instruction == "right") {
        grid[cell.y][cell.x]["border-right"] = false;
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x]["background-color"] = gridColorRed;
        grid[cell.y][cell.x + 1]["border-left"] = false;
    }
    if (instruction == "bottom") {
        grid[cell.y][cell.x]["border-bottom"] = false;
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x]["background-color"] = gridColorRed;
        grid[cell.y + 1][cell.x]["border-top"] = false;
    }
    if (instruction == "top") {
        grid[cell.y][cell.x]["border-top"] = false;
        grid[cell.y][cell.x].color = gridColorRed;
        // nodes[cell.y][cell.x]["background-color"] = gridColorRed;
        grid[cell.y - 1][cell.x]["border-bottom"] = false;
    }
    };
    function* primMaze(width, height) {
        const grid = grids.map(e => e.map(e => ({...e})));
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
      
          mergeFrontiers(grid, frontiers[frontierIndex]);
          let y = frontiers[frontierIndex].y;
          let x = frontiers[frontierIndex].x;
          frontiers.splice(frontierIndex, 1);
          yield grid;
      
          getFrontiers(grid, y, x);
          yield grid;
        }
    }

    const generateMaze = () => {
        // if (interval) clearInterval(interval);
        console.log('generateMaze')
        const alg = primMaze(10,10);
        interval = setInterval(() => {
          const val = alg.next();
          console.log('settg grid')
            setGrid(prev => {
            console.log(grids);
            if (val.value){
                return val.value.map(e => e.map(e => ({...e})))
            }
            else {
              console.log("done");
                clearInterval(interval);
                return prev;
            }
            });
            console.log(val.value)
        }, 10);
    }
    return [gridJSX,, generateMaze];
}
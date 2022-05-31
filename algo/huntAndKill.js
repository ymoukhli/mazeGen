import renderer from "./render.js";

const width = 100;
const height = 100;
const gridColorRed = "#f12711";
const gridColorPick = "#f5af19";
let interval = null;
let nodes = [];
// let grid = null;
let grid = Array(height)
  .fill(0)
  .map((_) => Array(width).fill(0));
let miniDone = false;
const creatMaze = () =>
  grid.map((e, i) =>
    e.map((_, j) => ({
      set: i * width + j,
      fromUpperRow: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
      x: j,
      y: i,
      color: "white",
    }))
  );

const getActions = (grid, y, x, color) => {
  const instructions = [];
  if (x > 0 && grid[y][x - 1].color === color) {
    instructions.push("left");
  }
  if (x < width - 1 && grid[y][x + 1].color === color) {
    instructions.push("right");
  }
  if (y < height - 1 && grid[y + 1][x].color === color) {
    instructions.push("bottom");
  }
  if (y > 0 && grid[y - 1][x].color === color) {
    instructions.push("top");
  }
  return instructions[Math.floor(Math.random() * instructions.length)];
};

const paintRow = (y, color) => {
  for (let i = 0; i < width; i++) {
    nodes[y][i].style["background-color"] = color ? color : grid[y][i].color;
  }
};
const lookForBranch = (j) => {
  for (let i = 0; i < width; i++) {
    // nodes[j][i].style["background-color"] = gridColorPick;
    if (grid[j][i].color === "white") {
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
function HunteAndkill() {
  grid = creatMaze();

  // pick random cell
  let currentCellx = Math.floor(Math.random() * width);
  let currentCelly = Math.floor(Math.random() * height);
  // color currecnt cell

  while (true) {
    // yield;
    nodes[currentCelly][currentCellx].style["background-color"] = gridColorRed;
    grid[currentCelly][currentCellx].color = gridColorRed;

    const instruction = getActions(grid, currentCelly, currentCellx, "white");

    // const instruction = instructions[Math.floor(Math.random() * instructions.length)];
    if (!instruction) {
      let donne = false;
      for (let k = 0; k < height; k++) {
        if (k != 0) paintRow(k - 1);
        // paintRow(k, gridColorPick);
        // yield;
        [currentCelly, currentCellx] = lookForBranch(k);
        if (currentCelly !== -1) {
          //   paintRow(k);
          //   yield;
          donne = true;
          break;
        }
      }
      if (donne) continue;
      //   paintRow(height - 1);
      console.log("donne");
      break;
    }
    if (instruction === "right") {
      nodes[currentCelly][currentCellx].style["border-right"] = "none";
      nodes[currentCelly][currentCellx + 1].style["border-left"] = "none";
      currentCellx++;
    }
    if (instruction === "left") {
      nodes[currentCelly][currentCellx].style["border-left"] = "none";
      nodes[currentCelly][currentCellx - 1].style["border-right"] = "none";
      currentCellx--;
    }
    if (instruction === "bottom") {
      nodes[currentCelly][currentCellx].style["border-bottom"] = "none";
      nodes[currentCelly + 1][currentCellx].style["border-top"] = "none";
      currentCelly++;
    }
    if (instruction === "top") {
      nodes[currentCelly][currentCellx].style["border-top"] = "none";
      nodes[currentCelly - 1][currentCellx].style["border-bottom"] = "none";
      currentCelly--;
    }
  }
}
nodes = renderer(width, height, document.getElementById("root"));

document.body.addEventListener("keyup", function (e) {
  if (e.key == " ") {
    startMaze();
    // maze.next();
  }
});

document.body.addEventListener("keyup", function (e) {
  if (e.key == "q") {
    startMaze();
    // maze.next();
    // maze.next();
    // maze.next();
    // maze.next();
    // maze.next();
    // maze.next();
  }
});

const startMaze = () => {
  nodes = [];
  document.getElementById("table")?.remove();
  nodes = renderer(width, height, document.getElementById("root"));

  HunteAndkill();
  //   if (interval) clearInterval(interval);
  //   interval = setInterval(() => {
  //     maze.next();
  //   }, 0);
};

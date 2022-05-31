import renderer from "./render.js";

const width = 50;
const height = 50;
const gridColorRed = "#f12711";
const gridColorPick = "#f5af19";

const frontiers = [];
let interval = null;
let nodes = [];
let grid = Array(height)
  .fill(0)
  .map((_) => Array(width).fill(0));
const creatMaze = () =>
  grid.map((e, i) =>
    e.map((_, j) => ({
      set: 0,
      left: false,
      right: false,
      top: false,
      bottom: false,
      nearleft: false,
      nearright: false,
      neartop: false,
      nearbottom: false,
      x: j,
      y: i,
      color: "white",
    }))
  );

const getFrontiers = (grid, nodes, y, x) => {
  // get right
  if (x < width - 1 && grid[y][x + 1].color != gridColorRed) {
    grid[y][x + 1].nearleft = true;
    if (grid[y][x + 1].color == "white") frontiers.push(grid[y][x + 1]);
    nodes[y][x + 1].style["background-color"] = gridColorPick;
    grid[y][x + 1].color = gridColorPick;
  }
  // get left

  if (x > 0 && grid[y][x - 1].color != gridColorRed) {
    grid[y][x - 1].nearright = true;
    if (grid[y][x - 1].color == "white") frontiers.push(grid[y][x - 1]);
    nodes[y][x - 1].style["background-color"] = gridColorPick;
    grid[y][x - 1].color = gridColorPick;
  }
  // get bottom
  if (y < height - 1 && grid[y + 1][x].color != gridColorRed) {
    grid[y + 1][x].neartop = true;
    if (grid[y + 1][x].color == "white") frontiers.push(grid[y + 1][x]);
    nodes[y + 1][x].style["background-color"] = gridColorPick;
    grid[y + 1][x].color = gridColorPick;
  }
  // get top
  if (y > 0 && grid[y - 1][x].color != gridColorRed) {
    grid[y - 1][x].nearbottom = true;
    if (grid[y - 1][x].color == "white") frontiers.push(grid[y - 1][x]);
    nodes[y - 1][x].style["background-color"] = gridColorPick;
    grid[y - 1][x].color = gridColorPick;
  }
};
nodes = renderer(width, height, document.getElementById("root"));
const mergeFrontiers = (cell) => {
  const arrInstruction = [];
  if (cell.nearleft) arrInstruction.push("left");
  if (cell.nearright) arrInstruction.push("right");
  if (cell.neartop) arrInstruction.push("top");
  if (cell.nearbottom) arrInstruction.push("bottom");

  const instruction =
    arrInstruction[Math.floor(Math.random() * arrInstruction.length)];
  if (instruction == "left") {
    nodes[cell.y][cell.x].style["border-left"] = "none";
    nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
    grid[cell.y][cell.x].color = gridColorRed;
    nodes[cell.y][cell.x - 1].style["border-right"] = "none";
  }
  if (instruction == "right") {
    nodes[cell.y][cell.x].style["border-right"] = "none";
    grid[cell.y][cell.x].color = gridColorRed;
    nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
    nodes[cell.y][cell.x + 1].style["border-left"] = "none";
  }
  if (instruction == "bottom") {
    nodes[cell.y][cell.x].style["border-bottom"] = "none";
    grid[cell.y][cell.x].color = gridColorRed;
    nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
    nodes[cell.y + 1][cell.x].style["border-top"] = "none";
  }
  if (instruction == "top") {
    nodes[cell.y][cell.x].style["border-top"] = "none";
    grid[cell.y][cell.x].color = gridColorRed;
    nodes[cell.y][cell.x].style["background-color"] = gridColorRed;
    nodes[cell.y - 1][cell.x].style["border-bottom"] = "none";
  }
};
function* primMaze(width, height) {
  grid = creatMaze();

  // pick random cell
  let currentCellx = Math.floor(Math.random() * width);
  let currentCelly = Math.floor(Math.random() * height);
  // color currecnt cell
  nodes[currentCelly][currentCellx].style["background-color"] = gridColorRed;
  grid[currentCelly][currentCellx].color = gridColorRed;
  getFrontiers(grid, nodes, currentCelly, currentCellx);
  yield;
  // pick random cell then repeate;
  while (frontiers.length > 0) {
    let frontierIndex = Math.floor(Math.random() * frontiers.length);
    // merge frontier

    mergeFrontiers(frontiers[frontierIndex]);
    let y = frontiers[frontierIndex].y;
    let x = frontiers[frontierIndex].x;
    frontiers.splice(frontierIndex, 1);
    yield;

    getFrontiers(grid, nodes, y, x);
    yield;
  }
}

// const prim = primMaze(width, height);
document.body.addEventListener("keyup", function (e) {
  if (e.key == " ") {
    startMaze();
    // prim.next();
  }
});

const startMaze = () => {
  const prim = primMaze(width, height);
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    prim.next();
  }, 0);
};

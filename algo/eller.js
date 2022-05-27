const width = 70;
const height = 70;
let interval = null;
const node = document.getElementById("root");
let grid = Array(height)
  .fill(0)
  .map((_) => Array(width).fill(0));

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

function* ellerMaze(width, height) {
  grid = creatMaze();

  for (let j = 0; j < height; j++) {
    let rowSets = {};
    for (let i = 0; i < width; i++) {
      let setId = grid[j][i].set;
      document.getElementById(`${j}_${i}`).style["background-color"] =
        "#f12711";

      if (!rowSets[setId]) rowSets[setId] = [];
      rowSets[setId].push(grid[j][i]);
      if (openRigthPath(grid, i, j) && i != width - 1) {
        clearRight(grid, j, i);
        yield;
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
            yield;
          }
        }
        if (!connected) {
          let x = rowSets[key][rowSetsLength - 1].x;
          let y = rowSets[key][rowSetsLength - 1].y;
          clearDown(grid, y, x);
          yield;
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
            yield;
          } else {
            clearTop(grid, y, x);
            yield;
          }
        } else if (!grid[y][x].top) {
          clearTop(grid, y, x);
          yield;
        } else if (!grid[y][x].right && x < width - 1) {
          clearRight(grid, y, x);
          yield;
        }
      }
    }
  }
  clearInterval(interval);
  console.log("done");
}

const clearTop = (grid, y, x) => {
  const topCell = document.getElementById(`${y - 1}_${x}`);
  topCell.style["border-bottom"] = "none";
  const currentCell = document.getElementById(`${y}_${x}`);
  currentCell.style["border-top"] = "none";
  grid[y - 1][x].set = grid[y][x].set;
  grid[y - 1][x].bottom = true;
  grid[y][x].top = true;
};
const clearRight = (grid, y, x) => {
  const rightCell = document.getElementById(`${y}_${x + 1}`);
  rightCell.style["border-left"] = "none";
  const currentCell = document.getElementById(`${y}_${x}`);
  currentCell.style["border-right"] = "none";
  grid[y][x + 1].set = grid[y][x].set;
  grid[y][x + 1].left = true;
  grid[y][x].right = true;
};
const clearDown = (grid, y, x) => {
  const downCell = document.getElementById(`${y + 1}_${x}`);
  downCell.style["border-top"] = "none";
  downCell.style["background-color"] = "#f5af19";
  const currentCell = document.getElementById(`${y}_${x}`);
  currentCell.style["border-bottom"] = "none";
  grid[y + 1][x].set = grid[y][x].set;
  grid[y][x].bottom = true;
  grid[y + 1][x].top = true;
};
const renderer = (grid, node) => {
  const gridStr = grid.reduce(
    (acc, e, i) =>
      acc +
      `<div class='row'>
        ${e.reduce(
          (acc, e, j) =>
            acc +
            `<div class='cell 
            ${e.right ? "right" : ""}
            ${e.left ? "left" : ""}
            ${e.bottom ? "bottom" : ""}
            ${e.top ? "top" : ""}
            '
            id='${i}_${j}'
            style="background-color: ${e.color}">
            </div>`,
          ``
        )}
        </div>`,
    ``
  );
  node.innerHTML = `<div id='table'>
                        <div id='tbody'>
                            ${gridStr}
                        </div>
                    </div>`;
};

// const eller = ellerMaze(width, height);
document.body.addEventListener("keyup", function (e) {
  if (e.key == " ") {
    startMaze();
    // ellerNext(eller);
  }
});

const startMaze = () => {
  const eller = ellerMaze(width, height);
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    ellerNext(eller);
  }, 0);
};

const ellerNext = (eller) => {
  eller.next(eller);
  // renderer(grid, node);
};

renderer(creatMaze(), node);

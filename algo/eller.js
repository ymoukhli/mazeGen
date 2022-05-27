const width = 10;
const height = 10;
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

function* ellerMaze(width, height) {
  grid = grid.map((e, i) =>
    e.map((_, j) => ({
      set: i * width + j,
      fromUpperRow: false,
      left: false,
      right: false,
      top: false,
      bottom: false,
      x: j,
      y: i,
    }))
  );

  for (let j = 0; j < height; j++) {
    let rowSets = {};
    for (let i = 0; i < width; i++) {
      let setId = grid[j][i].set;
      if (!rowSets[setId]) rowSets[setId] = [];
      rowSets[setId].push(grid[j][i]);
      console.log({ rowSets });
      yield;
      if (openRigthPath(grid, i, j) && i != width - 1) {
        grid[j][i + 1].set = setId;
        grid[j][i + 1].left = true;
        grid[j][i].right = true;
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
            grid[y + 1][x].set = grid[y][x].set;
            grid[y][x].bottom = true;
            grid[y + 1][x].top = true;
            yield;
          }
          console.log(`(${x}, ${y}) : ${connected}`);
        }
        if (!connected) {
          let x = rowSets[key][rowSetsLength - 1].x;
          let y = rowSets[key][rowSetsLength - 1].y;
          grid[y + 1][x].set = grid[y][x].set;
          grid[y][x].bottom = true;
          grid[y + 1][x].top = true;
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
            grid[y][x + 1].set = grid[y][x].set;
            grid[y][x + 1].left = true;
            grid[y][x].right = true;
            yield;
          } else {
            grid[y - 1][x].set = grid[y][x].set;
            grid[y - 1][x].bottom = true;
            grid[y][x].top = true;
            yield;
          }
        } else if (!grid[y][x].top) {
          grid[y - 1][x].set = grid[y][x].set;
          grid[y - 1][x].bottom = true;
          grid[y][x].top = true;
          yield;
        } else if (!grid[y][x].right && x < width - 1) {
          grid[y][x + 1].set = grid[y][x].set;
          grid[y][x + 1].left = true;
          grid[y][x].right = true;
          yield;
        }
      }
    }
  }
}

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
            ' id='${i}_${j}'>
                ${e.set}
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
  }, 2);
};

const ellerNext = (eller) => {
  eller.next(eller);
  renderer(grid, node);
};

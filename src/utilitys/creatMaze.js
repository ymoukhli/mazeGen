export default function createMaze(width, height)
{
    const grid = Array(height)
    .fill(0)
    .map((_) => Array(width).fill(0));
    return grid.map((e, i) =>
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
}
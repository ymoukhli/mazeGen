export default function createGrid(width, height) {
  const grid = [...Array(height).keys()].map((j, i) =>
    Array(width).fill({
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
    })
  );
  return grid;
}

export default function createGrid(width, height) {
  const grid = [...Array(height).keys()].map((j) =>
    [...Array(width).keys()].map((i) => ({
      set: i + j * width,
      left: false,
      right: false,
      top: false,
      bottom: false,
      nearleft: false,
      nearright: false,
      neartop: false,
      nearbottom: false,
      "border-top": true,
      "border-right": true,
      "border-left": true,
      "border-bottom": true,
      "background-color": "white",
      x: i,
      y: j,
      color: "white",
    }))
  );
  return grid;
}

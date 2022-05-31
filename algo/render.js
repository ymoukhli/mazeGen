export default function renderer(width, height, node) {
  const nodes = Array(height)
    .fill(0)
    .map((_) => []);

  const table = document.createElement("div");
  table.setAttribute("id", "table");
  const tbody = document.createElement("div");
  tbody.setAttribute("id", "tbody");
  for (let j = 0; j < height; j++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < width; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("id", "" + j + "_" + i);
      row.appendChild(cell);
      nodes[j].push(cell);
    }
    tbody.appendChild(row);
  }
  table.appendChild(tbody);
  node.appendChild(table);
  return nodes;
}

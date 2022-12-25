const boardContainerElem = document.querySelector("#board");
const boardRowContainer = boardContainerElem.querySelector(".rows");
let targetColumn = null;

const rowCount = 6;
const columnCount = 4;

const colors = ["red", "blue", "green", "yellow", "brown", "orange"]

for(let i = 0; i < rowCount; i++) {
  const rowElem = document.createElement("div");
  rowElem.classList.add("row");
  if(i < rowCount - 1) rowElem.classList.add("disabled");
  else rowElem.classList.add("selected")
  
  const colorsElem = document.createElement("div");
  colorsElem.classList.add("colors");
  
  const answerColors = document.createElement("div");
  answerColors.classList.add("answerColors");
  rowElem.append(colorsElem, answerColors);

  for(let j = 0; j < columnCount; j++) {
    const colElem = document.createElement("button");
    colElem.classList.add("col");
    if(j === 0) targetColumn = colElem;

    colorsElem.append(colElem);
  }

  boardRowContainer.append(rowElem);
}


for(const color of colors) {
  const colorElem = document.createElement("button");
  colorElem.classList.add("color", color);
  colorElem.addEventListener("click", e => setColor(color));

  boardContainerElem.querySelector(".colorSelection").append(colorElem);
}

boardRowContainer.addEventListener("click", e => {
  if(e.target.tagName !== "BUTTON") return;
  if(e.target.closest(".row.disabled")) return;
  targetColumn?.classList.remove("selected");
  targetColumn = e.target;
  targetColumn.classList.add("selected");
});

function setColor(color) {
  if(targetColumn === null) return;
  const elementWithColor = boardRowContainer.querySelector(`.row.selected [data-color="${color}"]`);
  
  targetColumn.classList.remove("selected");
  if(elementWithColor) swapColors(targetColumn, elementWithColor);
  else {
    targetColumn.classList.remove(...colors);
    targetColumn.classList.add(color);
    targetColumn.setAttribute("data-color", color);
  }

  targetColumn = boardRowContainer.querySelector(`.row.selected [class="col"]`); // Uncolored column
}

function swapColors(elementA, elementB) {
  const colorA = elementA.getAttribute("data-color");
  const colorB = elementB.getAttribute("data-color");

  elementA.classList.remove(...colors);
  elementB.classList.remove(...colors);

  if(colorB) elementA.classList.add(colorB || "");
  if(colorA) elementB.classList.add(colorA || "");

  if(colorB) elementA.setAttribute("data-color", colorB);
  else elementA.removeAttribute("data-color");
  if(colorA) elementB.setAttribute("data-color", colorA);
  else elementB.removeAttribute("data-color");
}

function unlockNextRow() {
  const disabledRows = Array.from(boardRowContainer.querySelectorAll(".row.disabled"));
  const lastDisabledRow = disabledRows.at(-1);
  boardRowContainer.querySelector(".row.selected")?.classList.remove("selected");
  lastDisabledRow?.classList.add("selected");
  lastDisabledRow?.classList.remove("disabled");

  targetColumn = lastDisabledRow.querySelector(".col");
}
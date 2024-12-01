let d = document;

let redoStack = [];
let undoStack = [];

function saveState() {
  undoStack.push(text.clone());
  redoStack = [];
}

const undoBtn = d.querySelector(".undo");
const redoBtn = d.querySelector(".redo");

undoBtn.addEventListener("click", () => {
  if (undoStack.length > 0) {
    const previousState = undoStack.pop();
    redoStack.push(text.clone());
    text.text(previousState.text());
    text.fontSize(previousState.fontSize());
    text.fontFamily(previousState.fontFamily());
    text.fill(previousState.fill());
    layer.draw();
  }
});

redoBtn.addEventListener("click", () => {
  if (redoStack.length > 0) {
    const nextState = redoStack.pop();
    undoStack.push(text.clone());
    text.text(nextState.text());
    text.fontSize(nextState.fontSize());
    text.fontFamily(nextState.fontFamily());
    text.fill(nextState.fill());
    layer.draw();
  }
});

let stage = new Konva.Stage({
  container: "canvas",
  width: 800,
  height: 700,
});


let layer = new Konva.Layer();
stage.add(layer);

let text = new Konva.Text({
  x: stage.width() / 6,
  y: 15,
  text: "Simple Text",
  fontSize: 20,
  fontFamily: "Calibri",
  fill: "black",
  draggable: true,
});

let addButton = d.querySelector(".add__text");

addButton.addEventListener("click", () => {
  layer.add(text);
  layer.draw();
  saveState();
});

text.on("dblclick", () => {
  const input = d.createElement("textarea");
  input.type = "text";
  input.value = text.text();
  input.style.position = "absolute";
  input.style.top = "15vh";

  d.body.appendChild(input);
  input.focus();

  const saveText = () => {
    text.text(input.value);
    layer.draw();
    d.body.removeChild(input);
    saveState();
  };

  input.addEventListener("blur", saveText);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveText();
  });
});

const plusButton = d.querySelector(".plusButton");
const sizeHolder = d.querySelector(".font__size__count");
sizeHolder.innerHTML = text.fontSize();

plusButton.addEventListener("click", () => {
  let fontSize = text.fontSize();
  fontSize += 10;
  text.fontSize(fontSize);
  sizeHolder.innerHTML = fontSize;
  layer.draw();
  saveState();
});

const minusButton = d.querySelector(".minusButton");

minusButton.addEventListener("click", () => {
  let fontSize = text.fontSize();
  fontSize -= 10;
  text.fontSize(fontSize);
  sizeHolder.innerHTML = fontSize;
  layer.draw();
  saveState();
});

const boldBtn = d.querySelector(".bold__btn");
const iBtn = d.querySelector(".italic__btn");
const centerBtn = d.querySelector(".center__btn");
const uBtn = d.querySelector(".underline__btn");

boldBtn.addEventListener("click", () => {
  text.fontStyle(text.fontStyle() === "bold" ? "normal" : "bold");
  layer.draw();
  saveState();
});

iBtn.addEventListener("click", () => {
  text.fontStyle(text.fontStyle() === "italic" ? "normal" : "italic");
  layer.draw();
  saveState();
});

centerBtn.addEventListener("click", () => {
  text.verticalAlign(text.verticalAlign() === "middle" ? "top" : "middle");
  layer.draw();
  saveState();
});

uBtn.addEventListener("click", () => {
  text.textDecoration(text.textDecoration() === "underline" ? "none" : "underline");
  layer.draw();
  saveState();
});

const fontSelect = document.getElementById("font-select");

fontSelect.addEventListener("change", () => {
  const selectedFont = fontSelect.value;
  text.fontFamily(selectedFont);
  layer.draw();
  saveState();
});

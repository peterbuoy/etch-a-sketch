const CONTAINER = document.getElementById("container");
const SQUARE_ARR = document.getElementsByClassName("square");
const CLEAR_BUTTON = document.getElementById("clear_button");
const EDIT_SIZE_BUTTON = document.getElementById("edit_size_button");
const MAX_PIXEL_SIDE_LENGTH = parseInt(
  window.getComputedStyle(CONTAINER).maxWidth
);
const RED_COLOR_BUTTON = document.getElementById("red_color_button");
const RANDOM_COLOR_BUTTON = document.getElementById("random_color_button");
const GRADUAL_SHADING_BUTTON = document.getElementById(
  "gradual_shading_button"
);
let colorChoice = "red";

CLEAR_BUTTON.addEventListener("click", () => clearGrid());
EDIT_SIZE_BUTTON.addEventListener("click", () => editGrid());
RED_COLOR_BUTTON.addEventListener("click", () => (colorChoice = "red"));
RANDOM_COLOR_BUTTON.addEventListener("click", () => (colorChoice = "random"));
GRADUAL_SHADING_BUTTON.addEventListener(
  "click",
  () => (colorChoice = "gradual")
);

// airbnb recommended style for functions
const addMouseoverListeners = function addMouseoverEventListenerForSquares() {
  for (let i = 0; i < SQUARE_ARR.length; i++) {
    SQUARE_ARR[i].addEventListener("mouseover", function (e) {
      if (colorChoice == "red") colorSquareRed(e);
      if (colorChoice == "random") colorSquareRandom(e);
      if (colorChoice == "gradual") colorSquareGradual(e);
    });
  }
};

// Initialization
let sideLength = 8;
populateGrid(sideLength);
addMouseoverListeners();

const colorSquareRed = (e) => {
  e.target.style.backgroundColor = "rgb(255, 0, 0)";
};

const colorSquareRandom = (e) => {
  const getRandomRGBValue = () => {
    return Math.floor(Math.random() * 256);
  };
  e.target.style.backgroundColor = `rgb(${getRandomRGBValue()},${getRandomRGBValue()},${getRandomRGBValue()})`;
};

const colorSquareGradual = (e) => {
  rgbString = e.target.style.backgroundColor;
  rgbArray = rgbString.substring(4, rgbString.length - 2).split(",");
  maxValue = parseInt(Math.max(...rgbArray));
  decMaxValue = maxValue - 20;
  e.target.style.backgroundColor = `rgb(${decMaxValue}, ${decMaxValue}, ${decMaxValue})`;
};

function populateGrid(sideLength) {
  let gridCount = sideLength ** 2;
  // Using fragments decreases render time by HALF
  let gridFrag = document.createDocumentFragment();
  for (let i = 0; i < gridCount; i++) {
    let div = document.createElement("div");
    div.classList.add("square");
    div.style.backgroundColor = "rgb(255,255,255)";
    gridFrag.appendChild(div);
  }
  CONTAINER.appendChild(gridFrag);
  /*
	for (let i = 0; i < gridCount; i++) {
		let div = document.createElement('div')
		div.classList.add('square');
		CONTAINER.append(div);
	}
	*/
}

const clearGrid = () => {
  for (let i = 0; i < SQUARE_ARR.length; i++) {
    SQUARE_ARR[i].style.backgroundColor = "rgb(255, 255, 255)";
  }
};

const editGrid = () => {
  maxSideLength = 100;
  let sideLength = prompt(
    `How many squares per side would you like? (Max: ${maxSideLength})`,
    ""
  );
  if (sideLength == null) return;
  while (!sideLength) {
    sideLength = prompt(
      `How many squares per side would you like? (Max: ${maxSideLength})`,
      ""
    );
  }
  sideLength = parseInt(sideLength);
  if (sideLength > maxSideLength) sideLength = maxSideLength;
  while (CONTAINER.firstChild) CONTAINER.removeChild(CONTAINER.firstChild);
  console.time("populateGrid");
  populateGrid(sideLength);
  console.timeEnd("populateGrid");
  addMouseoverListeners();
  squareSize = MAX_PIXEL_SIDE_LENGTH / sideLength;
  CONTAINER.style.gridTemplateRows = `repeat(${sideLength}, ${squareSize}px)`;
  CONTAINER.style.gridTemplateColumns = `repeat(${sideLength}, ${squareSize}px)`;
};

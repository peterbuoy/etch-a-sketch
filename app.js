const CONTAINER = document.getElementById('container');
const SQUARE_ARR = document.getElementsByClassName('square');
const CLEAR_BUTTON = document.getElementById('clear_button');
const EDIT_SIZE_BUTTON = document.getElementById('edit_size_button')
const MAX_PIXEL_SIDE_LENGTH = parseInt(window.getComputedStyle(CONTAINER).maxWidth);

CLEAR_BUTTON.addEventListener('click', () => clearGrid());
EDIT_SIZE_BUTTON.addEventListener('click', () => editGrid());

// airbnb recommended style for functions
const addMouseoverListeners = function addMouseoverEventListenerForSquares() {
	for (let i = 0; i < SQUARE_ARR.length; i++) {
		SQUARE_ARR[i].addEventListener('mouseover', function (e) {
			colorSquare(e);
		})
	}
}

// Initialization
let sideLength = 8;
populateGrid(sideLength)
addMouseoverListeners()

const colorSquare = (e) => {
	e.target.style.backgroundColor = 'red';
}

function populateGrid(sideLength) {
	let gridCount = sideLength ** 2;
	// Using fragments decreases render time by HALF
	let gridFrag = document.createDocumentFragment();
	for (let i = 0; i < gridCount; i++) {
		let div = document.createElement('div')
		div.classList.add('square');
		gridFrag.appendChild(div)
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
		SQUARE_ARR[i].style.backgroundColor= 'white';
	}
}

const editGrid = () => {
	maxSideLength = 100;
	let sideLength = prompt(`How many squares per side would you like? (Max: ${maxSideLength})`, "");
	while (!sideLength) {
		sideLength = prompt(`How many squares per side would you like? (Max: ${maxSideLength})`, "");
	}
	sideLength = parseInt(sideLength);
	if (sideLength > maxSideLength) sideLength = maxSideLength;
	while(CONTAINER.firstChild) CONTAINER.removeChild(CONTAINER.firstChild);
	console.time('populateGrid')
	populateGrid(sideLength);
	console.timeEnd('populateGrid');
	addMouseoverListeners()
	squareSize = (MAX_PIXEL_SIDE_LENGTH / sideLength);
	CONTAINER.style.gridTemplateRows = `repeat(${sideLength}, ${squareSize}px)`;
	CONTAINER.style.gridTemplateColumns = `repeat(${sideLength}, ${squareSize}px)`;
}
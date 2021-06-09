const CONTAINER = document.getElementById('container');
const DIV = document.createElement('div');
const SQUARE_ARR = document.getElementsByClassName('square');
DIV.classList.add('square');
const CLEAR_BUTTON = document.getElementById('clear_button');
CLEAR_BUTTON.addEventListener('click', () => resetGrid());

let sideLength = 8;

populateGrid(sideLength)

function populateGrid(sideLength) {
	let gridCount = sideLength ** 2;
	for (let i = 0; i < gridCount; i++) {
		// use cloneNode b/c appendChild just appends if already exists
		CONTAINER.appendChild(DIV.cloneNode());
	}
}

// Add event listener for each square
for (let i = 0; i < SQUARE_ARR.length; i++) {
	SQUARE_ARR[i].addEventListener('mouseover', function (e) {
		colorSquare(e);
	})
}

const colorSquare = (e) => {
	e.target.style.backgroundColor = 'red';
}

const resetGrid = () => {
	for (let i = 0; i < SQUARE_ARR.length; i++) {
		SQUARE_ARR[i].style.backgroundColor= 'white';
	}
	while(CONTAINER.firstChild) {
		CONTAINER.removeChild(CONTAINER.firstChild);
	}
	// This should be in a different function called change grid size
	// little different from the instructions
	let gridCount = parseInt(prompt('How many squares per side would you like?'));
	if (gridCount > 100) gridCount = 100;
	populateGrid(gridCount);
}
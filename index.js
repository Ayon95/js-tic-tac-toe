const cells = document.querySelectorAll('td');
const buttonNewGame = document.querySelector('.new-game');
const messageArea = document.querySelector('.message');
const playerXElement = document.querySelector('.player-x');
const playerOElement = document.querySelector('.player-o');

/* State variables */
let board;
let isPlaying;
let activePlayer;

function displayMessage(message) {
	messageArea.textContent = message;
}

function selectRandomActivePlayer() {
	let heads = Math.trunc(Math.random() * 2); // either 0 (false) or 1 (true)

	if (heads) {
		activePlayer = 'X';
		playerXElement.classList.add('active', 'active-x');
	} else {
		activePlayer = 'O';
		playerOElement.classList.add('active', 'active-o');
	}
}

function markCell(event) {
	// if the game is over
	if (!isPlaying) return;

	const clickedCell = event.target;

	// can only mark an empty cell
	if (clickedCell.textContent) return;

	// write O if active player is O, else write X
	if (activePlayer === 'O') {
		clickedCell.classList.add('player-o');
		clickedCell.textContent = 'O';
	}

	if (activePlayer === 'X') {
		clickedCell.textContent = 'X';
	}

	board[clickedCell.id] = clickedCell.textContent;
	// checking for winner
	if (winnerExists()) {
		endGame();
		displayMessage(`Player ${activePlayer} wins!`);
		// if the board doesn't have any empty cell; checking for tie
	} else if (!board.includes('')) {
		endGame();
		displayMessage("It's a tie.");
	} else {
		switchPlayer();
	}
}

function clearCells() {
	cells.forEach((cell) => {
		cell.textContent = '';
		cell.classList.remove('player-o');
	});
}

function switchPlayer() {
	// switching between player x and o
	activePlayer = activePlayer === 'X' ? 'O' : 'X';

	playerXElement.classList.toggle('active');
	playerXElement.classList.toggle('active-x');

	playerOElement.classList.toggle('active');
	playerOElement.classList.toggle('active-o');
}

// checks if the passed arguments are not '', or are not equal to each other
function allEqual() {
	for (let i = 1; i < arguments.length; i++) {
		if (arguments[i] === '' || arguments[i] !== arguments[i - 1]) {
			return false;
		}
	}
	return true;
}

function winnerExists() {
	// possible winning conditions
	if (allEqual(board[0], board[1], board[2])) {
		return true;
	} else if (allEqual(board[3], board[4], board[5])) {
		return true;
	} else if (allEqual(board[6], board[7], board[8])) {
		return true;
	} else if (allEqual(board[0], board[3], board[6])) {
		return true;
	} else if (allEqual(board[1], board[4], board[7])) {
		return true;
	} else if (allEqual(board[2], board[5], board[8])) {
		return true;
	} else if (allEqual(board[0], board[4], board[8])) {
		return true;
	} else if (allEqual(board[2], board[4], board[6])) {
		return true;
	}
	// else return false - the game ended in a tie
	return false;
}

function removeActivePlayer() {
	playerXElement.classList.remove('active', 'active-x');
	playerOElement.classList.remove('active', 'active-o');
}

function endGame() {
	isPlaying = false;
	removeActivePlayer();
}

function init() {
	/* Starting conditions */
	isPlaying = true;
	board = ['', '', '', '', '', '', '', '', ''];
	messageArea.textContent = '';

	clearCells();
	removeActivePlayer();

	selectRandomActivePlayer();

	cells.forEach((cell) => cell.addEventListener('click', markCell));
}

// initialize the game on load
window.addEventListener('load', init);

buttonNewGame.addEventListener('click', init);

// script.js
const cells = document.querySelectorAll('.data-cell');
const board = document.getElementById('board');
const gameStatus = document.getElementById('game-status');
const restartButton = document.getElementById('restartButton');
let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const startGame = () => {
    
    isXTurn = true;
    gameStatus.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.textContent = "";
        cell.addEventListener('click', handleCellClick, { once: true });
    });
    gameActive = true;
};

const handleCellClick = (e) => {
    const cell = e.target;
    console.log(e.target);
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
};

const placeMark = (cell, currentClass) => {
    if(!gameActive) {
        cells.addEventListener('click', function(e) {
                e.preventDefault();
            })
        }
    cell.classList.add(currentClass);
    console.log(cell.classList[2]);
    cell.textContent = cell.classList[2];
    cell.style.color = "#fff";
};

const swapTurns = () => {
    isXTurn = !isXTurn;
    gameStatus.textContent = isXTurn ? "Player X's turn" : "Player O's turn";
};

const checkWin = (currentClass) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const endGame = (draw) => {
    if (draw) {
        gameStatus.textContent = 'Draw!';
    } else {
        gameStatus.textContent = isXTurn ? "Player X Wins!" : "Player O Wins!";
    }
    gameActive = false;
    
    
};


restartButton.addEventListener('click', startGame);

startGame();

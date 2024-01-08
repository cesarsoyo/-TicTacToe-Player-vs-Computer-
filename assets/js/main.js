document.addEventListener('DOMContentLoaded', function () {
    let board = document.getElementById('board');
    let cells = document.querySelectorAll('.cell');
    let restartBtn = document.getElementById('restartBtn');

    let currentPlayer = 'X';
    let isGameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
let playerName = window.prompt("Nom du joueur : ")

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (isGameActive && !cell.textContent) {
                cell.textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    endGame(`${playerName} est le gagnant!`);
                } else if (isDraw()) {
                    endGame("C'est un match");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    computerMove();
                }
            }
        });
    });

    restartBtn.addEventListener('click', () => {
        cells.forEach(cell => {
            cell.textContent = '';
        });
        restartBtn.style.display = 'none';
        isGameActive = true;
        currentPlayer = 'X';
    });

    function computerMove() {
        setTimeout(() => {
            const availableCells = [...cells].filter(cell => !cell.textContent);
            if (availableCells.length > 0 && isGameActive) {
                let randomIndex = Math.floor(Math.random() * availableCells.length);
                availableCells[randomIndex].textContent = currentPlayer;
                if (checkWin(currentPlayer)) {
                    endGame('Votre ordinateur est le gagnant!');
                } else if (isDraw()) {
                    endGame("C'est un match");
                } else {
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        }, 200);
    }

    function checkWin(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => cells[index].textContent === player);
        });
    }

    function isDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function endGame(message) {
        isGameActive = false;
        restartBtn.style.display = 'block';
        alert(message);
    }
});
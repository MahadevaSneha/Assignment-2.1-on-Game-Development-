const cells = document.querySelectorAll('[data-cell]');
let currentPlayer = 'X';  

cells.forEach(cell => {
  cell.addEventListener('click', handleClick, { once: true });
});

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
 
  if (checkWin() || checkDraw()) {
    endGame();
  } else {
 
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winningConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === currentPlayer;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.textContent !== '';
  });
}

function endGame() {
  cells.forEach(cell => {
    cell.removeEventListener('click', handleClick);
  });

  const winner = checkWin() ? currentPlayer : 'draw';
   
  window.location.href = `winner.html?winner=${winner}`;
}
 
const urlParams = new URLSearchParams(window.location.search);
const winner = urlParams.get('winner');
const winnerMessage = document.getElementById('winner-message');

if (winner === 'draw') {
  winnerMessage.textContent = "It's a draw!";
} else {
  winnerMessage.textContent = `${winner} Won the game!`;
}

function playAgain() {
  window.location.href = 'index.html';
}

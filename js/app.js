
let board, turn, winner, tie;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.getElementById('message');
const resetBtnEl = document.getElementById('reset');


function init() {
  console.log('init function called');
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
}


function render() {
  updateBoard();
  updateMessage();
}


function updateBoard() {
  board.forEach((value, index) => {
    squareEls[index].textContent = value;
  });
}


function updateMessage() {
  if (winner) {
    messageEl.textContent = `Congratulations! Player ${turn} wins!`;
  } else if (tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `It's ${turn}'s turn`;
  }
}


function handleClick(event) {
  const squareIndex = parseInt(event.target.id);

  if (board[squareIndex] !== '' || winner) return; 
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}


squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});


function placePiece(index) {
  board[index] = turn; 
}


function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
      return;
    }
  }
}


function checkForTie() {
  if (winner) return; 
  tie = board.every(square => square !== ''); 
}


function switchPlayerTurn() {
  if (winner) return; 
  turn = turn === 'X' ? 'O' : 'X'; 
}


resetBtnEl.addEventListener('click', init);


init();

const gameCells = document.querySelectorAll(".cell");
const player1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
const restartBtn = document.querySelector(".restart-btn");
const alertBox = document.querySelector(".alertbox");

//Making Varibales
let currentPlayer = "X";
let nextPlayer = "O";
let playerTurn = currentPlayer;

player1.textContent = `player 1 : ${currentPlayer}`;
player2.textContent = `player 2 : ${nextPlayer}`;

//function to start your game
const startGame = () => {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
  });
};

const handleClick = (e) => {
  if (e.target.textContent === "") {
    e.target.textContent = playerTurn;

    if (checkWin()) {
      showAlert(`${playerTurn} is a Winner `);
      disableCells();
    } else if (checkTie()) {
      //   console.log(`Its a tie!`);
      showAlert(`Its a tie!`);
      disableCells();
    } else {
      changePlayerTurn();
      showAlert(` Turn for player :${playerTurn}`);
    }
  }
};

//function to change players turn
const changePlayerTurn = () => {
  if (playerTurn === currentPlayer) {
    playerTurn = nextPlayer;
  } else {
    playerTurn = currentPlayer;
  }
};

// function to check which player wins
const checkWin = () => {
  const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCondition.length; i++) {
    const [pos1, pos2, pos3] = winningCondition[i];

    if (
      gameCells[pos1].textContent !== "" &&
      gameCells[pos1].textContent === gameCells[pos2].textContent &&
      gameCells[pos2].textContent === gameCells[pos3].textContent
    ) {
      return true;
    }
  }
  return false;
};

//function to check for a tie
const checkTie = () => {
  let emptyCellsCount = 0;
  gameCells.forEach((cell) => {
    if (cell.textContent === "") {
      emptyCellsCount++;
    }
  });

  return emptyCellsCount === 0 && !checkWin();
};

// function to disable game board after a win or tie
const disableCells = () => {
  gameCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
    cell.classList.add("disabled");
  });
};

//function to restart game
const restartGame = () => {
  gameCells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("disabled");
  });
  startGame();
};

//function to show alert
const showAlert = (msg) => {
  alertBox.style.display = "block";
  alertBox.textContent = msg;
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
};

//adding event listener to restart button
restartBtn.addEventListener("click", restartGame);
//calling start game function
startGame();

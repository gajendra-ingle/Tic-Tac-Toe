const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

//  Winning positions
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to initialise the game.
function initGame() {
  currentPlayer = "X";
  //  Game grid empty -> used for check status of the game.
  gameGrid = ["", "", "", "", "", "", "", "", ""];

  //Update on UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";

    // initialise box with CSS properties again
    box.classList = `box box${index + 1}`;
  });

  // hide newGame button
  newGameBtn.classList.remove("active");
  //  Visible the current player
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
//function call
initGame();

// swapTurn function
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI Update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    // All 3 boxes should be non-empty and exactly same in value.
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check id winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      //disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // Now we know X/O is a winner
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  //it means we have a winner
  if (answer !== "") {
    gameInfo.innerText = `Winner Player - ${answer} `;
    newGameBtn.classList.add("active");
    return;
  }

  //let's check weather there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") {
      fillCount++;
    }
  });

  // board is filled, Game is tie
  if (fillCount === 9) {
    gameInfo.innerText = "Game Ties !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //Swap the turn
    swapTurn();
    // check the win
    checkGameOver();
  }
}

// Add event listner to each block
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// New Game button
newGameBtn.addEventListener("click", initGame);

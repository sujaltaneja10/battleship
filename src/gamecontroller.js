import { Player } from "./gameboard";
import { createGameboard, showWinner } from "./renderToDom";
import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
export { startGame };

let player = new Player();
let computer = new Player();

const startGame = () => {
  leftHalf.replaceChildren();
  rigtHalf.replaceChildren();
  createGameboard(rigtHalf, "Player");
  createGameboard(leftHalf, "Computer");
  startPlayerTurn();
};

const startPlayerTurn = () => {
  let child = document.querySelectorAll(".computer-board-div");
  child.forEach((element) =>
    element.addEventListener("click", playerClickHandler),
  );
};

const playerClickHandler = (event) => {
  let child = event.target;

  // to prevent clicking same place twice
  if (child.dataset.clicked) return;
  child.dataset.clicked = true;

  attackBox(child, computer, "computer");
  playerHasClicked();
};

const playerHasClicked = () => {
  endPlayerTurn();
  computerTurn();
  if (!gameOver()) startPlayerTurn();
  else showWinner(gameOver());
};

const endPlayerTurn = () => {
  let elements = document.querySelectorAll(".computer-board-div");
  elements.forEach((element) =>
    element.removeEventListener("click", playerClickHandler),
  );
};

const attackBox = (child, playerName, actualName) => {
  let result = playerName.board.receiveAttack(child.dataset.x, child.dataset.y);

  if (result === "ok") {
    child.classList.add("hit-div");
    child.classList.remove("hoverable-div");

    // get ship number of current box
    let shipNo = playerName.board.findIndexOfShip(child);

    // // if ship is sunk
    if (playerName.board.shipsSunkArray[shipNo] === true) {
      let ship = playerName.board.ships[shipNo];

      // give new class to all elements of the ship
      let array = ship.coordinates;
      for (let i = 0; i < array.length; i++) {
        let element = document.querySelector(
          `.${actualName}-board-div[data-x="${array[i][0]}"][data-y="${array[i][1]}"]`,
        );
        if (element.dataset.clicked) {
          element.classList.add("ship-complete-div");
          element.classList.remove("hit-div");
          element.classList.remove("hoverable-div");
        }
      }
    }
  } else if (result === "missed") {
    child.innerText = "X";
    child.classList.add("missed-div");
    child.classList.remove("hoverable-div");
  }
};

const computerTurn = () => {
  let [x1, y1] = getCoordinates();
  let child = document.querySelector(
    `.player-board-div[data-x="${x1}"][data-y="${y1}"]`,
  );

  // to prevent duplicates
  if (child.dataset.clicked) return computerTurn();
  child.dataset.clicked = true;

  attackBox(child, player, "player");
};

const getCoordinates = () => {
  let x1 = Math.floor(Math.random() * 10);
  let y1 = Math.floor(Math.random() * 10);
  return [x1, y1];
};

const gameOver = () => {
  if (player.board.allShipsSunk) {
    return "Computer";
  } else if (computer.board.allShipsSunk) {
    return "Player";
  } else return false;
};

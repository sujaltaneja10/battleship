import { Player } from "./gameboard";
import { createGameboard, showWinner } from "./renderToDom";
import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
export { startGame };

let player = new Player();
let computer = new Player();

let lastX = -1;
let lastY = -1;
let lastHit = false;
let shipComplete = false;
let adjacentElements = [];

const startGame = () => {
  leftHalf.replaceChildren();
  rigtHalf.replaceChildren();
  createGameboard(rigtHalf, player, "Player");
  createGameboard(leftHalf, computer, "Computer");
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
    if (actualName === "player") {
      lastHit = true;
    }

    child.innerText = "✔";
    child.classList.add("hit-div");
    child.classList.remove("hoverable-div");
    child.classList.remove("showable-ship-div");

    // get ship number of current box
    let shipNo = playerName.board.findIndexOfShip(child);

    // // if ship is sunk
    if (playerName.board.shipsSunkArray[shipNo] === true) {
      if (actualName === "player") {
        adjacentElements = [];
        shipComplete = true;
      }

      let ship = playerName.board.ships[shipNo];

      // give new class to all elements of the ship
      let array = ship.coordinates;
      for (let i = 0; i < array.length; i++) {
        let element = document.querySelector(
          `.${actualName}-board-div[data-x="${array[i][0]}"][data-y="${array[i][1]}"]`,
        );
        if (element.dataset.clicked) {
          element.classList.add("ship-complete-div");
          element.innerText = "";
          element.classList.remove("hit-div");
          element.classList.remove("hoverable-div");
        }
      }
    }
  } else if (result === "missed") {
    if (actualName === "player") {
      lastHit = false;
    }

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
  if (shipComplete) {
    shipComplete = false;
    lastX = Math.floor(Math.random() * 10);
    lastY = Math.floor(Math.random() * 10);
  } else if (lastHit === true) {
    adjacentElements.push(
      [lastX + 1, lastY],
      [lastX, lastY + 1],
      [lastX - 1, lastY],
      [lastX, lastY - 1],
    );
  }
  if (adjacentElements.length != 0) {
    lastX = adjacentElements[0][0];
    lastY = adjacentElements[0][1];
    adjacentElements.splice(0, 1);
  } else {
    lastX = Math.floor(Math.random() * 10);
    lastY = Math.floor(Math.random() * 10);
  }
  if (lastX >= 0 && lastX < 10 && lastY >= 0 && lastY < 10) {
    return [lastX, lastY];
  } else {
    return getCoordinates();
  }
};

const gameOver = () => {
  if (player.board.allShipsSunk) {
    return "Computer";
  } else if (computer.board.allShipsSunk) {
    return "Player";
  } else return false;
};

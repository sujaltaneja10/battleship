import { Ship, Gameboard, Player } from "./gameboard";
import { createGameboard } from "./renderToDom";
import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
export { startGame };

let turn = true;
let player = new Player();
let computer = new Player();

const startGame = () => {
  leftHalf.replaceChildren();
  rigtHalf.replaceChildren();
  createGameboard(rigtHalf, "Player");
  createGameboard(leftHalf, "Computer");
  playTurn();
};

const playTurn = () => {
  if (turn) {
    // if (playerTurn() == "again") {
    //   console.log("again");
    playerTurn();
    // }
    turn = false;
  } else {
    computerTurn();
    turn = true;
  }
  //   if (!player.board.allShipsSunk && !computer.board.allShipsSunk) {
  //     playTurn();
  //   }
  return;
};

const playerClickHandler = (child) => {
  let result = computer.board.receiveAttack(child.dataset.x, child.dataset.y);
  if (result === "ok") {
    child.innerText = "O";
  } else if (result === "missed") {
    child.innerText = "X";
  }
  return result;
};

const playerTurn = () => {
  console.log(computer.board.ship1.coordinates);
  let child = document.querySelectorAll(".computer-board-div");
  child.forEach((element) =>
    element.addEventListener("click", () => playerClickHandler(element)),
  );
};

const computerTurn = () => {
  let child = document.querySelectorAll(".computer-board-div");
  child.forEach((element) =>
    element.removeEventListener("click", () => playerClickHandler(element)),
  );
  let x1 = Math.floor(Math.random() * 9);
  let y1 = Math.floor(Math.random() * 9);
  child = document.querySelectorAll(".player-board-div");
  //   child.forEach((element) => {
  //     if (element.dataset.x == x1 && element.dataset.y == y1) {
  //     }
  //   });
};

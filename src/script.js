import "./style.css";
// import { Ship, Gameboard, Player } from "./gameboard";
import { createGameboard } from "./renderToDom";

function getElements() {
  const playGameBtn = document.querySelector(".play-game");
  const leftHalf = document.querySelector(".left-half");
  const rigtHalf = document.querySelector(".right-half");
  return { playGameBtn, leftHalf, rigtHalf };
}

const { playGameBtn, leftHalf, rigtHalf } = getElements();

const startGame = () => {
  leftHalf.replaceChildren();
  rigtHalf.replaceChildren();
  createGameboard(leftHalf, "Player");
  createGameboard(rigtHalf, "Computer");
};

playGameBtn.addEventListener("click", startGame);

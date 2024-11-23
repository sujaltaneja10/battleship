import "./style.css";
// import { Player } from "./gameboard";
import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
import { startGame } from "./gamecontroller";

playGameBtn.addEventListener("click", startGame);

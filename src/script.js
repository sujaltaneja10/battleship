import "./style.css";
import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
import { startGame } from "./gamecontroller";

playGameBtn.addEventListener("click", startGame);

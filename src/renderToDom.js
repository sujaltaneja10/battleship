import { playGameBtn, leftHalf, rigtHalf } from "./getElements";
export { createGameboard, showWinner };

const createGameboard = (half, player) => {
  const para = document.createElement("p");
  para.classList.add("board-para");
  para.innerText = `${player}'s Board`;
  half.appendChild(para);

  for (let i = 0; i < 10; i++) {
    const row = document.createElement("div");
    row.classList.add("board-row");
    half.appendChild(row);

    for (let j = 0; j < 10; j++) {
      const child = document.createElement("div");
      child.classList.add("board-div");
      child.setAttribute("data-x", `${i}`);
      child.setAttribute("data-y", `${j}`);
      row.appendChild(child);

      if (player === "Computer") {
        child.classList.add("computer-board-div");
        child.classList.add("hoverable-div");
      }

      if (player === "Player") {
        child.classList.add("player-board-div");
      }
    }
  }
};

const showWinner = (winner) => {
  let winnerScene = document.createElement("p");
  winnerScene.innerText = winner + " Wins!";
  winnerScene.classList.add("winner-name-screen");

  let playAgainButton = document.createElement("button");
  playAgainButton.innerText = "Go Back!";
  playAgainButton.classList.add("play-again-btn");

  let myGithubLink = document.createElement("button");
  myGithubLink.innerText = "Know More";
  myGithubLink.classList.add("my-github-link");

  let sourceCodeLink = document.createElement("button");
  sourceCodeLink.innerText = "Source Code";
  sourceCodeLink.classList.add("my-github-link");

  if (winner === "Player") {
    rigtHalf.replaceChildren();
    rigtHalf.appendChild(winnerScene);
    rigtHalf.appendChild(playAgainButton);
    rigtHalf.appendChild(sourceCodeLink);
    rigtHalf.appendChild(myGithubLink);
    rigtHalf.classList.add("winner-half");
  } else if (winner === "Computer") {
    leftHalf.replaceChildren();
    leftHalf.appendChild(winnerScene);
    leftHalf.appendChild(playAgainButton);
    leftHalf.appendChild(myGithubLink);
    leftHalf.appendChild(sourceCodeLink);
    leftHalf.classList.add("winner-half");
  }

  playAgainButton.addEventListener("click", () => {
    location.reload();
  });

  myGithubLink.addEventListener("click", () => {
    window.open("https://www.github.com/sujaltaneja10", "_blank");
  });

  sourceCodeLink.addEventListener("click", () => {
    window.open("https://www.github.com/sujaltaneja10/battleship", "_blank");
  });
};

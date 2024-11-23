export { createGameboard };

const getChildData = (child) => {
  console.log(child.dataset.x, child.dataset.y);
};

const createGameboard = (half, player) => {
  const para = document.createElement("p");
  para.classList.add("board-para");
  para.innerText = `${player}'s Turn`;
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
      child.addEventListener("click", () => getChildData(child));
    }
  }
};

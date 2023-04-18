"use strict";

const PlayerFactory = (nameId, marker, chosenFields) => {
  const name = document.getElementById(nameId).value;
  return { name, marker, chosenFields };
};

const gameBoard = (() => {
  const gameContainer = document.querySelector("#game-container");

  const render = () => {
    for (let i = 1; i < 10; i++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add(
        "aspect-square",
        "bg-stone-50",
        "flex",
        "justify-center",
        "items-center"
      );
      gridCell.setAttribute("index", i);
      gameContainer.appendChild(gridCell);
    }
  };

  const gridCellEvent = () => {
    for (let child of gameContainer.children) {
      child.addEventListener("click", function (currentPlayer) {
        if (winner === true) {
          console.log("Game over.");
          return;
        } else if (moves === 9) {
          console.log("Game over.");
          return;
        } else if (child.textContent !== "") {
          console.log("Already taken. Choose another!");
        } else {
          currentPlayer = setCurrentPlayer();
          child.innerHTML = currentPlayer.marker;
          let index = child.getAttribute("index");
          currentPlayer.chosenFields.push(index);
          checkWinner(currentPlayer.name, currentPlayer.chosenFields);
        }
      });
    }
  };

  let playerOne;
  let playerTwo;
  const playerForm = document.querySelector("#player-form");
  const playerBoard = document.createElement("p");
  /* const playerOneEl = document.createElement("span");
  playerOneEl.textContent = playerOne.name;
  const playerTwoEl = document.createElement("span");
  playerTwoEl.textContent = playerTwo.name; */
  const getPlayer = () => {
    playerOne = PlayerFactory(
      "player-one",
      ` <svg
      width="80%"
      height="80%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 5L4.99998 19M5.00001 5L19 19"
        stroke="#2dd4bf"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`,
      []
    );

    playerTwo = PlayerFactory(
      "player-two",
      `<svg
      width="80%"
      height="80%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21C10.22 21 8.47991 20.4722 6.99987 19.4832C5.51983 18.4943 4.36628 17.0887 3.68509 15.4442C3.0039 13.7996 2.82567 11.99 3.17294 10.2442C3.5202 8.49836 4.37737 6.89472 5.63604 5.63604C6.89472 4.37737 8.49836 3.5202 10.2442 3.17294C11.99 2.82567 13.7996 3.0039 15.4442 3.68509C17.0887 4.36628 18.4943 5.51983 19.4832 6.99987C20.4722 8.47991 21 10.22 21 12C21 14.387 20.0518 16.6761 18.364 18.364C16.6761 20.0518 14.387 21 12 21ZM12 4.5C10.5166 4.5 9.0666 4.93987 7.83323 5.76398C6.59986 6.58809 5.63856 7.75943 5.07091 9.12988C4.50325 10.5003 4.35473 12.0083 4.64411 13.4632C4.9335 14.918 5.64781 16.2544 6.6967 17.3033C7.7456 18.3522 9.08197 19.0665 10.5368 19.3559C11.9917 19.6453 13.4997 19.4968 14.8701 18.9291C16.2406 18.3614 17.4119 17.4001 18.236 16.1668C19.0601 14.9334 19.5 13.4834 19.5 12C19.5 10.0109 18.7098 8.10323 17.3033 6.6967C15.8968 5.29018 13.9891 4.5 12 4.5Z"
        fill="#818cf8"
      />
    </svg>`,
      []
    );

    if (playerOne.name === "" && playerTwo.name === "") {
      playerOne.name = "Player 1";
      playerTwo.name = "Player 2";
    } else if (playerOne.name === "") {
      playerOne.name = "Player 1";
    } else if (playerTwo.name === "") {
      playerTwo.name = "Player 2";
    }

    playerForm.innerHTML = "";
    playerBoard.textContent = `${playerOne.name} vs. ${playerTwo.name}`;
    playerForm.appendChild(playerBoard);
  };

  let currentPlayer;
  function setCurrentPlayer() {
    if (currentPlayer === playerTwo || currentPlayer === undefined) {
      currentPlayer = playerOne;
    } else {
      currentPlayer = playerTwo;
    }
    return currentPlayer;
  }

  const winningCondition = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ];

  let winner;
  let moves = 0;
  function checkWinner(player, playerArray) {
    moves++;
    let conditionCheck;
    for (let i = 0; i < winningCondition.length; i++) {
      conditionCheck = winningCondition[i].every((value) => {
        return playerArray.includes(value);
      });
      if (conditionCheck === true) {
        playerBoard.textContent = `${player} wins.`;
        winner = true;
        return;
      }
    }
    if (conditionCheck === false && moves === 9) {
      playerBoard.textContent = "Tie. Try again.";
      return;
    }
  }

  function newGame() {
    for (let child of gameContainer.children) {
      child.textContent = "";
    }
    playerOne.chosenFields = [];
    playerTwo.chosenFields = [];
    currentPlayer = undefined;
    winner = false;
    moves = 0;
    playerBoard.textContent = `${playerOne.name} vs. ${playerTwo.name}`;
  }

  return { render, gridCellEvent, newGame, getPlayer };
})();

gameBoard.render();

const displayController = (() => {
  const startGameBtn = document.getElementById("start-btn");
  startGameBtn.addEventListener("click", () => {
    gameBoard.gridCellEvent();
    gameBoard.getPlayer();
  });

  const newGameBtn = document.getElementById("new-btn");
  newGameBtn.addEventListener("click", () => {
    gameBoard.newGame();
  });
})();

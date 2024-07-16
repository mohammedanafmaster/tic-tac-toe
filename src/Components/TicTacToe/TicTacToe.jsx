import React, { useRef, useState } from "react";
import "./TicTacToe.css";
import circle from "../Assets/circle.png";
import cross from "../Assets/cross.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [board, setBoard] = useState(Array(9).fill(""));
  const titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || board[num]) {
      return;
    }

    const newBoard = [...board];
    if (count % 2 === 0) {
      newBoard[num] = "x";
      e.target.innerHTML = `<img src='${cross}' alt="X">`;
    } else {
      newBoard[num] = "o";
      e.target.innerHTML = `<img src='${circle}' alt="O">`;
    }
    setBoard(newBoard);
    setCount(count + 1);
    checkWin(newBoard);
  };

  const checkWin = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        won(board[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulations, the winner is: <img src="${cross}" alt="X">`;
    } else {
      titleRef.current.innerHTML = `Congratulations, the winner is: <img src="${circle}" alt="O">`;
    }
  };

  const resetGame = () => {
    setCount(0);
    setLock(false);
    setBoard(Array(9).fill(""));
    titleRef.current.innerHTML = `Tic Tac Toe Game In&nbsp;<span>React</span>`;
    const boxes = document.querySelectorAll(".boxes");
    boxes.forEach((box) => (box.innerHTML = ""));
  };

  return (
    <div className="tic-tac-toe text-center">
      <h1
        ref={titleRef}
        className="title text-white mt-7 text-6xl flex items-center justify-center"
      >
        Tic Tac Toe Game In&nbsp;<span>React</span>
      </h1>

      <div className="board h-auto m-auto flex flex-wrap my-7 gap-2">
        {board.map((_, index) => (
          <div
            key={index}
            className="boxes"
            onClick={(e) => toggle(e, index)}
          ></div>
        ))}
      </div>

      <button
        type="button"
        onClick={resetGame}
        className="reset flex items-center justify-center m-auto text-3xl border-none outline-none cursor-pointer"
      >
        Reset
      </button>
    </div>
  );
};

export default TicTacToe;

import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import './App.css'

//Reset Button component
function ResetButton( { onReset }) {
  return (
    <button id="reset" onClick={onReset}>
      Reset Game
    </button>
  );

}

// Box component
function Box({ value, onClick }) {
  return (
    <button className="box" onClick={onClick}>
      {value}
    </button>
  );
}



function App() {
  // State variables


  const [count, setCount] = useState(0)

  const [boxes, setBoxes] = useState(Array(9).fill(null));

  const [isX, setIsX] = useState(true);

  const [compIsX, setCompIsX] = useState(Math.floor(Math.random() * 2) === 0);

  const winner = calculateWinner(boxes);

  const isFirstMount= useRef(true);

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (count == 9) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${isX ? 'X' : 'O'}`;
  }

  const handleClick = (i) => {
    if (boxes[i] || calculateWinner(boxes)) {
      return; 
    }
    setBoxes(prev => 
      prev.map((box, j) => j === i ? (isX ? 'X' : 'O') : box)
    );
    setIsX(!isX);
    setCount(count + 1);
  }

  const handleReset = () => {
    setBoxes(Array(9).fill(null));
    setIsX(true);
    setCount(0);
    setCompIsX(Math.floor(Math.random() * 2) === 0);
  }

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    if (isX === compIsX) {
      const emptyBoxes = boxes.map((box, index) => box === null ? index : null).filter(index => index !== null);
      if (emptyBoxes.length > 0 && !calculateWinner(boxes) && count < 9 ) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        
        // console log minimax value
        console.log("Minimax value for computer move: ", minimax(boxes, compIsX));

        const compMove = minimax(boxes, compIsX)[1];
        handleClick(compMove);
      }
    }
  }, [boxes]);
  

  return (
    <>
      <main>
        <h1 className='title'>Unbeatable Tic Tac Toe</h1>
        <div className="container">
          <div className="game">
            <Box value={boxes[0]} onClick={() => handleClick(0)} />
            <Box value={boxes[1]} onClick={() => handleClick(1)} />
            <Box value={boxes[2]} onClick={() => handleClick(2)} />
            <Box value={boxes[3]} onClick={() => handleClick(3)} />
            <Box value={boxes[4]} onClick={() => handleClick(4)} />
            <Box value={boxes[5]} onClick={() => handleClick(5)} />
            <Box value={boxes[6]} onClick={() => handleClick(6)} />
            <Box value={boxes[7]} onClick={() => handleClick(7)} />
            <Box value={boxes[8]} onClick={() => handleClick(8)} />
          </div>
        </div>
        <ResetButton onReset={handleReset}></ResetButton>

        <div className="status">
          <p>{status}</p>
        </div>

      </main>
    </>
  )
}

function calculateWinner(boxes) {
  // winning patterns for Tic Tac Toe
  // each pattern is an array of indices that represent the winning combination
  const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
      return boxes[a];
    }
  } 
  return null;
}

// Minimax algorithm to determine the best move for the computer
function minimax(state, isMaximizing) {
  const winner = calculateWinner(state);

  // terminal states
  if (winner === 'X') {
    return [1, null]; // win
  } else if (winner === 'O') {
    return [-1, null];// loss
  } else if (state.every(box => box !== null)) {
    return [0, null]; // Draw
  }

  // maximizing player (X)
  if (isMaximizing) {
    let bestScore = -Infinity;
    let bestMove = null;

    // loop through all actions
    for (let i = 0; i < state.length; i++) {
      if (state[i] === null) {
        const nextState = JSON.parse(JSON.stringify(state))
        nextState[i] = 'X'
        const score = (minimax(nextState, false))[0]
        if (score > bestScore) {
          bestMove = i; // store the best move
        }
        bestScore = Math.max(score, bestScore)
        
      }
    }

    return [bestScore, bestMove]; // return the best score and move
  } 

  // minimizing player (O)
  else {
    let bestScore = Infinity;
    let bestMove = null;

    // loop through all actions
    for (let i = 0; i < state.length; i++) {
      if (state[i] === null) {
        const nextState = JSON.parse(JSON.stringify(state))
        nextState[i] = 'O'
        const score = (minimax(nextState, true))[0]
        if (score < bestScore) {
          bestMove = i; // store the best move
        }
        bestScore = Math.min(score, bestScore)
      }
    }

    return [bestScore, bestMove]; // return the best score and move
  }

}

export default App

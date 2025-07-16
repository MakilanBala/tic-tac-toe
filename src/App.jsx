import React from 'react'
import { useState } from 'react'
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
  // winning patterns for Tic Tac Toe
  // each pattern is an array of indices that represent the winning combination

  const [count, setCount] = useState(0)

  const [boxes, setBoxes] = useState(Array(9).fill(null));

  const [isX, setIsX] = useState(true);

  const winner = calculateWinner(boxes);

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
    boxes[i] = isX ? 'X' : 'O';
    setBoxes(boxes);
    setIsX(!isX);
    setCount(count + 1);
  }

  const handleReset = () => {
    setBoxes(Array(9).fill(null));
    setIsX(true);
    setCount(0);
  }

  return (
    <>
      <main>
        <h1 className='title'>Tic Tac Toe</h1>
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

export default App

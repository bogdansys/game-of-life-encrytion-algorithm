import React from 'react';

const GameOfLifeVisualization = ({ grid }) => {
  return (
    <div className="game-of-life-grid">
      {grid.map((row, i) => (
        <div key={i} className="flex">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`w-1 h-1 ${cell ? 'bg-black' : 'bg-white'}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameOfLifeVisualization;
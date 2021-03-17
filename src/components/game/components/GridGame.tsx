import React from "react";

interface Props {
  state: React.ComponentState;
  setState: React.Dispatch<
    React.SetStateAction<{
      grid: boolean[][] | any;
      gridLength: number;
      gridIteration: number;
      deathCells: string;
      aliveCells: string;
      isLive: boolean;
      pattern: string;
    }>
  >;
}

const GridGame = ({ state, setState }: Props) => {
  const { grid, aliveCells, deathCells } = state;
  let newGrid = grid;
  return grid.length > 0
    ? grid.map((line: boolean[], i: number) => (
        <div key={i}>
          {line.map((cell: boolean, j: number) => (
            <span
              key={j}
              onClick={() => {
                newGrid[i][j] = !cell;
                setState((prevState) => ({ ...prevState, grid: newGrid }));
              }}
            >
              {cell ? aliveCells : deathCells}
            </span>
          ))}
        </div>
      ))
    : null;
};

export default GridGame;

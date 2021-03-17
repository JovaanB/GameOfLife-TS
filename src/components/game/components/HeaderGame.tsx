import React, { useEffect } from "react";

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

const HeaderGame = ({ state, setState }: Props) => {
  const {
    isLive,
    gridIteration,
    grid,
    gridLength,
    aliveCells,
    deathCells,
    pattern,
  } = state;

  useEffect(() => {
    if (isLive && gridIteration >= 0) {
      const intervalId = setInterval(() => {
        onNextStep();
      }, 100);
      return () => {
        clearInterval(intervalId);
      };
    }
  });

  const onChange = (event: React.FormEvent<HTMLInputElement>): any => {
    const { name, value } = event.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const generateInitialGrid = (length: number) =>
    Array.from({ length }, () =>
      Array.from({ length }, () => Math.random() >= 0.8)
    );

  const generateInitialGridWithFalse = (length: number) =>
    Array.from({ length }, () => Array.from({ length }, () => false));

  const countAliveNeighbour = (grid: any, x: number, y: number) => {
    let numberOfAliveNeighbour = 0;
    for (let i = x - 1; i < x + 2; i++) {
      for (let j = y - 1; j < y + 2; j++) {
        const line = grid[i];
        if ((i !== x || j !== y) && line)
          grid[i][j] && numberOfAliveNeighbour++;
      }
    }
    return numberOfAliveNeighbour;
  };
  const getNextState = (currState: any, aliveNeighbour: number) => {
    if (aliveNeighbour === 3) return true;
    if (aliveNeighbour < 2 || aliveNeighbour > 3) return false;
    return currState;
  };

  const updateGrid = (grid: any) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid.length; j++) {
        const aliveNeighbour = countAliveNeighbour(grid, i, j);
        const nextState = getNextState(grid[i][j], aliveNeighbour);
        newGrid[i][j] = nextState;
      }
    }
    return newGrid;
  };

  const onGenerate = () => {
    switch (pattern) {
      case "clignotant":
        generateBlinkerPattern();
        break;
      default:
        setState((prevState) => ({
          ...prevState,
          grid: generateInitialGrid(gridLength),
        }));
        break;
    }
  };

  const onNextStep = () => {
    if (gridIteration > 0) {
      setState((prevState) => ({
        ...prevState,
        grid: updateGrid(grid),
        gridIteration: prevState.gridIteration--,
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        isLive: false,
      }));
    }
  };

  const onPlay = () => {
    if (gridIteration > 0)
      setState((prevState) => ({
        ...prevState,
        isLive: !isLive,
      }));
  };

  const generateBlinkerPattern = () => {
    const newGrid = generateInitialGridWithFalse(4);
    newGrid[0][2] = newGrid[0][3] = newGrid[1][2] = newGrid[1][3] = newGrid[2][0] = newGrid[3][0] = newGrid[2][1] = newGrid[3][1] = true;
    setState((prevState) => ({
      ...prevState,
      gridLength: 4,
      grid: newGrid,
    }));
  };

  return (
    <div
      className="nes-container with-title is-centered"
      style={{ margin: "0 auto", maxWidth: "90vw" }}
    >
      <p className="title">Options</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: "20px 50px",
        }}
      >
        <div>
          <input
            size={5}
            type="number"
            name="gridLength"
            className="nes-input"
            placeholder="Taille"
            value={gridLength}
            onChange={onChange}
          />
          <input
            size={5}
            type="number"
            name="gridIteration"
            className="nes-input"
            placeholder="Iteration"
            value={gridIteration}
            onChange={onChange}
          />
        </div>
        <div>
          <div className="nes-select">
            <select
              defaultValue={pattern}
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  pattern: e.target.value,
                }))
              }
            >
              <option className="is-disabled" value="default">
                Pattern
              </option>
              <option value="clignotant">Clignotant</option>
            </select>
          </div>
          <button className="nes-btn is-primary" onClick={onGenerate}>
            Générer
          </button>
          <button className="nes-btn is-primary" onClick={onNextStep}>
            {">"}
          </button>
        </div>
        <div>
          <input
            size={1}
            name="aliveCells"
            className="nes-input"
            type="text"
            id="aliveCell"
            value={aliveCells}
            onChange={onChange}
          />
          <input
            size={1}
            className="nes-input"
            type="text"
            name="deathCells"
            id="deathCell"
            value={deathCells}
            onChange={onChange}
          />
        </div>
        <div>
          <button
            className={`nes-btn ${!isLive ? "is-primary" : "is-error"} ${
              gridIteration < 1 && "is-disabled"
            }`}
            onClick={onPlay}
          >
            {!isLive ? "Jouer" : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderGame;

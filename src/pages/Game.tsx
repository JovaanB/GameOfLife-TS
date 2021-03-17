import Layout from "../components/layouts/Layout";
import { useState } from "react";
import HeaderGame from "../components/game/components/HeaderGame";
import GridGame from "../components/game/components/GridGame";

const Game = () => {
  const [state, setState] = useState({
    grid: [],
    gridLength: 10,
    gridIteration: 10,
    deathCells: "X",
    aliveCells: ".",
    isLive: false,
    pattern: "default",
  });

  return sessionStorage.getItem("logged") === "true" ? (
    <Layout title="Game">
      <div>
        <HeaderGame state={state} setState={setState} />
        <GridGame state={state} setState={setState} />
      </div>
    </Layout>
  ) : (
    <Layout title="Erreur">
      <div>
        <p>Vous n'êtes pas connecté...</p>
      </div>
    </Layout>
  );
};

export default Game;

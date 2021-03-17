import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Game from "./pages/Game";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

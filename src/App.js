import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
      <div className="App">
        <h1 className = 'title'>Lights Out Game!</h1>
        <h3>Make each cell turn dark!</h3>
        <Board className = 'board'/>
      </div>
  );
}

export default App;

import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = .5}) {
  const [board, setBoard] = useState(()=>createBoard());

  
      
  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    console.log("newGame")
    let initialBoard = Array.from({ length: nrows }, () =>
      Array.from({ length: ncols }, () => false)
    );
    for(let i = 0; i< nrows; i++){
      for(let j = 0; j<ncols; j++){
        if (Math.random() < chanceLightStartsOn) {
          initialBoard = flipCellsAround(`${i}-${j}`, initialBoard);
          console.log(`${i+1}-${j+1}`)
        }
      }
    }
  
    return initialBoard;
  }
  

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => cell === false));

  }

  function flipCellsAround(coord, boardParam ) {
      const currentBoard = boardParam || board;
    
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
     let boardCopy = currentBoard.map(row => [...row])

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy)
      flipCell(y-1,x,boardCopy)
      flipCell(y+1,x,boardCopy)
      flipCell(y,x-1,boardCopy)
      flipCell(y,x+1,boardCopy)
      // TODO: return the copy
      if (!boardParam) {
        setBoard(boardCopy);
      }
      return boardCopy
    };
  
  const randomizeAgain = () =>{
    setBoard(createBoard())
  }

  

  // if the game is won, just show a winning msg & render nothing else

  if (hasWon()) {
    return <div className="game-won">
      <h2>You Won!</h2>
    <button onClick= {()=>setBoard(createBoard())}>New Game?</button>
    </div>;
  }

  // TODO

  // make table board

  // TODO

  return (
    <div>
    <table className = "board">
      <tbody>
        {board.map( (row, y) => (
          <tr key = {y}>
         {row.map((isLit,x) => (
          <Cell
            key = {[y,x]}
            isLit= {isLit}
            flipCellsAroundMe = {() => flipCellsAround(`${y}-${x}`)}
          
          
          />
         )

         )}
            
        </tr>
        )

        )}
        
      </tbody>
    </table>
          <button className = 'button' onClick = {() => randomizeAgain()}>Restart</button>
    </div>
  )
}

export default Board;

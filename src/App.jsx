import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import { Log } from "./components/Log";
import {
  DERIVED_ACTIVE_PLAYER as derivedActivePlayer,
  INITIAL_GAME_BOARD as initialGameBoard,
  DERIVED_WINNER as derivedWinner,
  DERIVED_GAME_BOARD as derivedGameBoard,
  PLAYERS as Players,
} from "./helper/helper";
import GameOver from "./components/GameOver";

function App() {
  const [players, setPlayers] = useState(Players);
  const [gameTurns, setGameTurns] = useState([]);

  function handlePlayernameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  let gameBoard = derivedGameBoard(gameTurns);

  const hasDraw = gameTurns.length === 9 && !winner;

  const activePlayer = derivedActivePlayer(gameTurns);

  const winner = derivedWinner(gameBoard, players);

  function handleChangeActivePlayer(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(gameTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={Players.X}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onChangeName={handlePlayernameChange}
          />
          <Player
            initialName={Players.O}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onChangeName={handlePlayernameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleChangeActivePlayer}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

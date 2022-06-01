import { useEffect, useState } from 'react';
import { Patterns } from './Patterns';
// import components
import Cell from './components/Cell';
import ResultsModal from './components/ResultsModal';

const App = () => {
  const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [result, setResult] = useState({ winner: 'none', state: 'none' });

  useEffect(() => {
    checkWin();
    checkIfTie();
  }, [board]);

  const handleClick = (cellIdx) => {
    console.log('cell clicked');

    setBoard(
      board.map((item, idx) => {
        if (idx === cellIdx && item === '') return currentPlayer;

        return item;
      })
    );

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const restartGame = () => {
    setCurrentPlayer('X');
    setBoard(['', '', '', '', '', '', '', '', '']);
    setResult({ winner: false, state: 'none' });
  };

  const checkWin = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer === '') return;
      let foundWinningPattern = true;
      currPattern.forEach((idx) => {
        if (board[idx] !== firstPlayer) {
          foundWinningPattern = false;
        }
      });
      if (foundWinningPattern) {
        setResult({ winner: firstPlayer, state: 'Won' });
      }
    });
  };

  const checkIfTie = () => {
    let filled = true;
    board.forEach((cell) => {
      if (cell === '') {
        filled = false;
      }
    });

    if (filled) {
      setResult({ winner: false, state: 'Tie' });
    }
  };

  return (
    <div className="App">
      <div className="board">
        <div className="board-row">
          <Cell value={board[0]} handleClick={() => handleClick(0)} />
          <Cell value={board[1]} handleClick={() => handleClick(1)} />
          <Cell value={board[2]} handleClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Cell value={board[3]} handleClick={() => handleClick(3)} />
          <Cell value={board[4]} handleClick={() => handleClick(4)} />
          <Cell value={board[5]} handleClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Cell value={board[6]} handleClick={() => handleClick(6)} />
          <Cell value={board[7]} handleClick={() => handleClick(7)} />
          <Cell value={board[8]} handleClick={() => handleClick(8)} />
        </div>
      </div>
      {result.state !== 'none' && (
        <ResultsModal
          winner={result.winner}
          tie={result.state}
          restartGame={restartGame}
        />
      )}
    </div>
  );
};

export default App;

/* TODOS 

1.) Create a board array with 9 empty strings to emulate cells in a grid

*/

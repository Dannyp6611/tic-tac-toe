const ResultsModal = ({ winner, tie, restartGame }) => {
  return (
    <div className="backdrop">
      <div className="modal">
        {winner && <h2>Game Finished! {winner} Won.</h2>}
        {tie && <h2>Game Finished! It was a tie.</h2>}
        <button onClick={restartGame}>Restart Game</button>
      </div>
    </div>
  );
};

export default ResultsModal;

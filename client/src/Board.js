import React from 'react';

const Board = ({
  submit, click, addName, name, score, word, onGoing, reset,
}) => {
  const gameOngoing = () => <p id="word">{word}</p>;

  const gameOver = () => (
    <div>
      <input className={submit ? 'nameInput' : 'hide'} maxLength="12" type="text" onChange={addName} autoFocus />
      <input className={submit ? 'submitButton' : 'hide'} type="button" value="Enter name" onClick={click} />

      <p id="endGameScore">SCORE: {score}</p>
      <button id="newGameBtn" onClick={reset}> NEW GAME </button>
    </div>
  );

  let insideBox = null;
  insideBox = onGoing ? gameOngoing() : gameOver();

  return (
    <div className="box">
      {insideBox}
    </div>
  );
};

export default Board;

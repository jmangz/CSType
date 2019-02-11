import React from 'react';
import PropTypes from 'prop-types';

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

Board.propTypes = {
  submit: PropTypes.bool.isRequired,
  click: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  word: PropTypes.string.isRequired,
  onGoing: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
};

export default Board;

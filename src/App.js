import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import sad from './sad.mp3';
import soundFile from './pickup.wav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      timer: 10,
      wordList: [],
      active: '',
      text: '',
      onGoing: false,
      streak: 0,
      startGame: false,
      startBtn: true,
      players: [],
      gameOver: false,
      name: '',
      submit: true,
    };
    this.baseState = this.state;
    this.sound = new Audio(soundFile);
    this.wrongSound = new Audio(sad);
    this.interval = null;
    this.handleClick = this.handleClick.bind(this);
    this.getWords = this.getWords.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.timer = this.timer.bind(this);
    this.addName = this.addName.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkWord = this.checkWord.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    this.setState({ wordList: this.getWords() });
    fetch('http://localhost:4000/')
      .then(response => response.json())
      .then((data) => {
        const playersList = data.map((player) => {
          const obj = {};
          obj.name = player.name;
          obj.score = player.score;
          obj._id = player._id;
          return obj;
        });
        this.setState({
          players: playersList,
        });
      });
  }

  onButtonClick() {
    this.setState({
      startGame: true,
      onGoing: true,
      startBtn: false,
      active: this.state.wordList[Math.floor(Math.random() * this.state.wordList.length)],
    });
    this.interval = setInterval(this.timer, 1000);
  }

  getWords() {
    return ['apple', 'banana', 'cow', 'Jon Skeet', 'Codesmith', 'execution context', 'schema', 'what in tarnation', 'array', 'linked-list',
      'Welch\'s', 'Milo', 'tech talk', 'thursday night drinks', 'react', 'webpack', 'node', 'enter', 'pear-programming', 'agile',
      'TDD', 'state', 'whiteboard', 'MVP', 'github', 'coffee', 'Slack', 'quirks', 'stack overflow', 'mainframe', 'nerf war', 'chicken tendies',
      'scope', 'quality assurance', 'hack hour', 'pa$$word', 'git commit -m "xD"', 'pull request', 'fellow', 'i don\'t know what i\'m doing'];
  }

  getPlayers() {
    fetch('http://localhost:4000/')
      .then(response => response.json())
      .then((data) => {
        const playersList = data.map((player) => {
          // console.log(player);
          const obj = {};
          obj.name = player.name;
          obj.score = player.score;
          obj._id = player._id;
          return obj;
        });
        this.setState({
          players: playersList,
        });
        return playersList;
      });
  }

  handleChange(e) {
    this.setState({
      text: e.target.value,
    });
  }

  keyPress(e) {
    if (e.keyCode === 13) {
      this.checkWord(e.target.value);
    }
  }

  timer() {
    const newTime = this.state.timer - 1;
    this.setState({
      timer: newTime,
    });
    if (newTime === 0) {
      clearInterval(this.interval);
      this.setState({
        onGoing: false,
        gameOver: true,
      });
    }
  }

  addName(evt) {
    const newName = evt.target.value;
    this.setState({
      name: newName,
    });
  }

  deleteSixth() {
    const players = this.state.players.sort((a, b) => b.score - a.score);
    const id = players[5]._id;
    console.log(players, id);
    fetch('http://localhost:4000/sixthPlace', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
      }),
    });
  }

  handleClick() {
    this.setState({
      submit: false,
    });
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.name,
        score: this.state.score,
      }),
    }).then(() => {
      this.getPlayers();
      if (this.state.players.length > 5) this.deleteSixth();
    });
  }

  checkWord(input) {
    if (this.state.active === input) {
      this.newWord();
      this.sound.play();
      const newStreak = this.state.streak + 1;
      const newScore = this.state.score + 1;
      this.setState({
        text: '',
        score: newScore,
        streak: newStreak,
      });
    } else {
      this.wrongSound.play();
      this.setState({
        streak: 0,
      });
    }
  }

  newWord() {
    this.setState({
      active: this.state.wordList[Math.floor(Math.random() * this.state.wordList.length)],
    });
  }

  restartGame() {
    this.setState(Object.assign(
      this.baseState,
      { wordList: this.getWords() },
    ));
    fetch('http://localhost:4000/')
      .then(response => response.json())
      .then((data) => {
        const playersList = data.map((player) => {
          const obj = {};
          obj.name = player.name;
          obj.score = player.score;
          obj._id = player._id;
          return obj;
        });
        this.setState({
          players: playersList,
        });
      });
  }

  render() {
    const players = [];
    this.state.players.sort((a, b) => {
      if (a.score - b.score > 0) {
        return -1;
      } else if (a.score - b.score < 0) {
        return 1;
      }
      return 0;
    });

    for (let i = 0; i < this.state.players.length && i < 5; i += 1) {
      const { name, score, _id } = this.state.players[i];
      players.push(<li key={_id}>{name} Score: {score}</li>);
    }

    return (
      <div className="App">
        <button className={this.state.startBtn ? 'onBtn' : 'offBtn'} onClick={this.onButtonClick}> START </button>
        {this.state.startGame ?
          <div>
            <Board
              submit={this.state.submit}
              click={this.handleClick}
              addName={this.addName}
              name={this.state.name}
              score={this.state.score}
              word={this.state.active}
              onGoing={this.state.onGoing}
              reset={this.restartGame}
            />
            <div id={this.state.onGoing ? 'score' : 'scoreOff'}>{this.state.score}</div>
            <div id={this.state.onGoing ? 'timer' : 'timerOff'}>{this.state.timer}</div>
            <div id={this.state.onGoing ? 'streak' : 'streakOff'}>Streak: {this.state.streak}</div>
            <div id={!this.state.onGoing && this.state.gameOver ? 'leaderboard' : 'streakOff'}>
              <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>Leaderboards</p>
              <ol>{players}</ol>
            </div>
            <input
              id={this.state.onGoing ? 'inputBox' : 'inputBoxOff'}
              value={this.state.text}
              onKeyDown={this.keyPress}
              onChange={this.handleChange}
              autoFocus
            />
          </div> : null
        }
      </div>
    );
  }
}

export default App;

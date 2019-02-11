const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const leaderboardController = require('./controllers/leaderboardController');

const app = express();
const PORT = process.env.PORT || 4000;
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('../build'));

app.post('/', leaderboardController.addPlayer);

app.get('/', leaderboardController.getAll);

app.delete('/', leaderboardController.deleteLeaderboard);

app.delete('/sixthPlace', leaderboardController.deleteSixth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;

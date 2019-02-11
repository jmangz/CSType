const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const leaderboardController = require('./controllers/leaderboardController');

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('Connected to Database'));

app.use(cors());
app.use(express.static(path.join(__dirname, 'client', 'dist')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('../build'));

app.post('/api', leaderboardController.addPlayer);

app.get('/api', leaderboardController.getAll);

app.delete('/api', leaderboardController.deleteLeaderboard);

app.delete('/api/sixthPlace', leaderboardController.deleteSixth);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

// module.exports = app;

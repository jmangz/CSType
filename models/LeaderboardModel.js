const mongoose = require('mongoose');

const { Schema } = mongoose;

const leaderboardSchema = new Schema({
  name: String,
  score: Number,
});

const Leaderboard = mongoose.model('leaderboard', leaderboardSchema);

module.exports = Leaderboard;

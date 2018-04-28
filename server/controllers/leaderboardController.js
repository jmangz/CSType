const Leaderboard = require('../models/LeaderboardModel');

const leaderboardController = {
  getAll: (req, res) => {
    Leaderboard.find({}, (err, result) => {
      if (err) return res.status(418).send(err);
      return res.json(result);
    });
  },

  createLeaderboard: (req, res) => {
    Leaderboard.create(req.body, (err, result) => {
      if (err) return res.status(418).send(err);
      return res.json(result);
    });
  },

  deleteLeaderboard: (req, res) => {
    Leaderboard.remove({}, (err, result) => {
      if (err) return res.status(418).send(err);
      return res.json({ removed: 'success' });
    });
  },
};

module.exports = leaderboardController;

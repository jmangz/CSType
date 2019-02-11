const Leaderboard = require('../models/LeaderboardModel');

const leaderboardController = {
  getAll: (req, res) => {
    Leaderboard.find({}, (err, result) => {
      if (err) return res.status(418).send(err);
      return res.json(result);
    });
  },

  addPlayer: (req, res) => {
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

  deleteSixth: (req, res) => {
    const { id } = req.body;
    console.log(id, req.body);
    Leaderboard.findByIdAndRemove(id, (err, result) => {
      if (err) return res.status(418).json(err);
      console.log('nicee');
      return res.json(result);
    });
  },
};

module.exports = leaderboardController;

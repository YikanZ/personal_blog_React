const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing'
  },
  completedTime: {
    type: String,
    default: ''
  }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;

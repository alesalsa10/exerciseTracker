const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  workouts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Workout',
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);

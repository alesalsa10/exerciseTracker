const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    require: true,
  },
  exercises: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('User', UserSchema);

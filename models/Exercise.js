//model for user created exercises
//defautls one are found on a preexistign mongodb database

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: { type: String },
  muscleGroup: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

module.exports = mongoose.model('User', UserSchema);

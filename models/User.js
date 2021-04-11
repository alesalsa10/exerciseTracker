const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
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
  height:{
    type: Number
  },
  weight:{
    type: Number
  },
  BMI:{
    type: Number
  },
  fat:{
    type: Number
  }
});

module.exports = mongoose.model('User', UserSchema);

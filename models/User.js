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
  verified:{
    type: Boolean,
    default: false
  },
  confirmationCode: {
    type:String,
    require: true
  },
  workouts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Workout',
    },
  ],
  heightFeet: {
    type: Number,
    require: true,
    default: 1,
    min: 1,
    max: 10
  },
  heightInches: {
    type: Number,
    require: true,
    default: 0,
    max: 11
  },
  weight: {
    type: Number,
    require: true,
    default: 1,
    min: 1,
  },
  BMI: {
    type: Number,
    require: true,
    default: 1,
  },
  fat: {
    type: Number,
    require: true,
    default: 1,
    min: 1,
    max: 100
  },
});

module.exports = mongoose.model('User', UserSchema);

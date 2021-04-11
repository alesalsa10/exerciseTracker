const express = require('express');
require('dotenv').config();
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

const User = require('../models/User');

router.get('/:id', auth, async (req, res) => {
  try {
    //mongoose.Types.ObjectId.isValid
    let id = req.params.id;
    let user = await User.findById(id).select('-password');

    console.log(user);

    if (!user) {
      //return error if no user matches id
      return res.status(404).json({ err: 'No user found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res.status(404).json({ err: 'No user found' });
    } else {
      console.log(error);
      return res.status(500).json({ err: 'Something went wrong' });
    }
  }
});

module.exports = router;

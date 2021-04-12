const express = require('express');
require('dotenv').config();
const router = express.Router();
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

//sign in with email or username
router.post(
  '/',
  check('email')
    .optional({ nullable: true, checkFalsy: true })
    .isEmail()
    .withMessage('Please include a valid email'),
  check('password')
    .optional({ nullable: true, checkFalsy: true })
    .exists()
    .withMessage('Password is required'),
  check('username')
    .optional({ nullable: true, checkFalsy: true })
    .exists()
    .withMessage('Username is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, username } = req.body;

    try {
      //let user = await User.findOne({ email });
      let user;
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }

      //if no user is found return error
      if (!user) {
        return res.status(401).json({ err: 'Invalid credentials' });
      }

      //compare password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      //return error if passwords do not match
      if (!isPasswordMatch) {
        return res.status(401).json({ err: 'Invalid credentials' });
      }

      //return jwt token
      return res.json({
        token: jwt.sign({ id: user.id }, process.env.SECRET),
        id: user._id,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ err: 'Something went wrong' });
    }
  }
);

module.exports = router;

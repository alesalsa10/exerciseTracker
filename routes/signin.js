const express = require('express');
require('dotenv').config();
const router = express.Router();
var jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
var createError = require('http-errors');
const bcrypt = require('bcrypt');

const User = require('../models/User');

router.post(
  '/',
  check('email').isEmail().withMessage('Please include a valid email'),
  check('password').exists().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      //if no user is found return error
      if (!user) {
        return createError(401, 'Invalid credentials');
      }

      //compare password
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      //return error if passwords do not match
      if (!isPasswordMatch) {
        return createError(401, 'Invalid credentials');
      }

      //return jwt token
      return res.json({ token: jwt.sign({ id: user.id }, process.env.SECRET) });


    } catch (error) {
      console.log(error);
      return createError(500, 'Something went wrong');
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


const User = require('../models/User');



router.post(
  '/',
  check('email').isEmail().withMessage('Must be an email'),
  check('password').isLength({min: 8}).withMessage('Password must be at least 8 characters long'),
  check('username').not().isEmpty().withMessage('Name is required').isLength({max: 20}).withMessage('Username must be less than 20 characters'),
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {username, email, password} = req.body;

      try{
        let user = await User.findOne({email});

        //if user exists return error
        if(user){
            return res.status(400).json({ err: 'User already exists' });
        }

        //create user
        user = new User({
            username, email, password
        })

        //encrypt password
        //const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, 10);

        //save user
        await user.save()

        res.json('User created')

      }catch(error){
        console.log(error);
        return res.status(500).json({ err: 'Something went wrong' });
      }
  }
);

module.exports = router;

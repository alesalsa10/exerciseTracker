const express = require('express');
require('dotenv').config();
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

const User = require('../models/User');
const { findByIdAndUpdate } = require('../models/User');

//get an user
router.get('/:id', auth, async (req, res) => {
  try {
    //mongoose.Types.ObjectId.isValid
    let id = req.params.id;
    let user = await User.findById(id).select('-password');

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

//update profile
router.put(
  '/:id',
  auth,
  check('heightFeet')
    .isNumeric()
    .withMessage('Height must be a number')
    .isLength({ min: 1, max: 10 }),
  check('heightInches')
    .isNumeric()
    .withMessage('Height must be a number')
    .isLength({ min: 0, max: 11 })
    .withMessage('Inches must be between 0 and 11'),
  check('weight').isNumeric().withMessage('Weight must be a number'),
  check('fat')
    .isNumeric()
    .withMessage('Fat must be a number')
    .isLength({ min: 1, max: 100 }).withMessage('You cannot have more than 100% fat'),
  async (req, res) => {
    try {
      let id = req.params.id;

      const { heightFeet, heightInches, weight, fat } = req.body;

      

      await User.findByIdAndUpdate(
        id,
        //{ weight },
        {heightFeet},
        //{heightInches},
        //{fat},
        { new: true },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            res.status(200).json(result);
          }
        }
      );
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        return res.status(404).json({ err: 'No user found' });
      } else {
        console.log(error);
        return res.status(500).json({ err: 'Something went wrong' });
      }
    }
  }
);

module.exports = router;

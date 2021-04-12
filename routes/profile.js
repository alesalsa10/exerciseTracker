const express = require('express');
require('dotenv').config();
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

const User = require('../models/User');

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
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1, max: 10 })
    .withMessage('Height must be between 1 and 10 feet tall'),
  check('heightInches')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 0, max: 11 })
    .withMessage('Inches must be between 0 and 11'),
  check('weight')
    .isInt({ min: 1 })
    .withMessage('Weight must be a number')
    .optional({ nullable: true, checkFalsy: true }),
  check('fat')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 1, max: 100 })
    .withMessage('Fat must be between 1 and 100'),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let id = req.params.id;

      const { heightFeet, heightInches, weight, fat } = req.body;

      let payloadObject = {
        heightFeet,
        heightInches,
        weight,
        fat,
        BMI: (703 * weight) / Math.pow(heightFeet * 12 + heightInches, 2),
      };

      await User.findByIdAndUpdate(
        id,
        payloadObject,
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

//delete profile
router.delete('/:id', auth, async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete(id);

    res.status(200).json('User deleted')

  } catch (error) {
    console.log(error);
    res.status(500).json('Something went wrong');
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/:confirmationCode', async (req, res) => {
  const confirmationCode = req.params.confirmationCode;

  let user = await User.findOne({ confirmationCode });

  if (!user) {
    return res.status(404).json({ err: 'User not found' });
  } else if (user.verified) {
    return res.status(200).json({ err: 'User already verified' });
  } else {
    user.verified = true;
    await user.save();
    return res.status(200).json({ Message: 'User verified' });
  }
});

module.exports = router;

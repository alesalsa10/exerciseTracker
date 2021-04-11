const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = function (req, res, next) {
  //Get Token from the header
  const token = req.header('Authorization');

  //check if not token
  if (!token) {
    return res.status(401).json({ err: 'Invalid credentials' });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(500).json({ err: 'Invalid token' });
  }
};

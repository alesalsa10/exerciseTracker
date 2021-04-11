const jwt = require('jsonwebtoken');
require('dotenv').config();
var createError = require('http-errors');


module.exports = function (req, res, next) {
  //Get Token from the header
  const token = req.header('authorization');

  //check if not token
  if (!token) {
    return createError(401, 'Authorization defined');
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = decoded.user;
    next();
  } catch (err) {
    return createError(401, 'Invalid token')
  }
};

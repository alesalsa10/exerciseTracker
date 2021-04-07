const express = require('express');
const connectToDb = require('./configs/database');
require('dotenv').config();
const User = require('./models/User')

const app = express();
const port = process.env.PORT || 5000;

connectToDb()

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});

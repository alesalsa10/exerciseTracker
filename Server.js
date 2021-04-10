const express = require('express');
const connectToDb = require('./configs/database');
require('dotenv').config();
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors);
const port = process.env.PORT || 5000;

connectToDb()

//Routes
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.use('/register', require('./routes/register'))




app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});

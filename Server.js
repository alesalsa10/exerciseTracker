const express = require('express');
const connectToDb = require('./configs/database');
require('dotenv').config();
const cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json())


const port = process.env.PORT || 5000;

connectToDb()

//Routes
app.get('/', function (req, res) {
  res.send('Hello World');
});
app.use('/register', require('./routes/register'))
app.use('/signin', require('./routes/signin'));



app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});

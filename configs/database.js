require('dotenv').config();
const mongoose = require('mongoose');



const connectToDB = async () => {
  try {
   await mongoose.connect(process.env.DB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,
   });
   console.log('Mongodb connected');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1)
  }
};

module.exports = connectToDB;

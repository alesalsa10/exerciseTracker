require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_URI);

const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

module.exports = connectToDB;

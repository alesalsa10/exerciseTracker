const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = (email, confirmationCode, name) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  let mailOptions;
  mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Email confirmation',
    html: `Hello ${name}. Welcome to the the best fitness tracker`,
    html: `Click  <a  href=http://localhost:3000/verify/${confirmationCode}>here</a>  to verify your email.`,
  };

  transporter.sendMail(mailOptions, (error, response)=>{
      if(error){
          console.log(error)
      } else {
          console.log('Email sent')
      }
  })
};

module.exports = sendEmail

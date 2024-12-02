
let env = require("dotenv").config();

const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: ' smtp-mail.outlook.com', // Ensure no leading/trailing whitespace
  port: 587,
  secure: false, // true for 465, false for other ports like 587
  auth: {
    user: process.env.ACCOUNT_NAME,
    pass: process.env.ACC_PASS,
  },
});


let sendEmailOTP = (email, otpEmail) => {
  const mailOptions = {
    to: email,
    from: process.env.ACCOUNT_NAME,
    subject: "Otp for registration is: ",
    html:
      "<h3>OTP for email verification is </h3>" +
      "<h1 style='font-weight:bold;'>" +
      otpEmail +
      "</h1>", // html body
  };
  return transporter.sendMail(mailOptions);
};
module.exports = { sendEmailOTP };

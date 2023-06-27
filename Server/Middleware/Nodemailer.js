const nodemailer = require("nodemailer");
let env = require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
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

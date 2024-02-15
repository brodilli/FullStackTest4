const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();
// @desc    Verification nodemailer
// @access  Public
module.exports.transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_SECRET,
  },
});

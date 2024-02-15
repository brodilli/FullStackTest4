const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");
const UserVerification = require("../models/userVerificationModel");
const UserForgotPassword = require("../models/userForgotPasswordModel");
const { v4: uuidv4 } = require("uuid");
const { transporter } = require("../config/transporter");
const { emailFormat } = require("../utils/emailGenerator");
const { emailFormatForgotPD } = require("../utils/emailGeneratoForgotPD");
const { cloudinary } = require("../cloudinary");

dotenv.config();

const transporterVerify = transporter.verify((err, success) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Email service Online".magenta.bold);
  }
});

// @desc    Register a new user
// @route   POST /api/users/signup
// @access  Public
module.exports.registerUser = asyncHandler(async (req, res) => {
  const { email, name, lastName, username, password } = req.body.user;
  const userExist = await User.findOne({ email: email });
  const usernameTaken = await User.findOne({ username: username });
  const emailTakenVerification = await UserVerification.findOne({
    email: email,
  });
  const usernameTakenVerification = await UserVerification.findOne({
    username: username,
  });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist, use another email");
  } else if (usernameTaken) {
    res.status(400);
    throw new Error("This username already exist, choose another");
  } else if (emailTakenVerification) {
    if (emailTakenVerification.createdAt.getTime() + 300000 < Date.now()) {
      await UserVerification.deleteOne({ email });
    } else {
      res.status(400);
      throw new Error(
        `A mail has been sent to your mail please check you mailbox and spam folder or wait ${Math.ceil(
          (emailTakenVerification.createdAt.getTime() + 300000 - Date.now()) /
            60000
        )} minutes to sign up again`
      );
    }
  } else if (usernameTakenVerification) {
    if (usernameTakenVerification.expiresAt.getTime() < Date.now()) {
      await UserVerification.deleteOne({ username });
    } else {
      res.status(400);
      throw new Error("This username already exist, please choose another one");
    }
  }
  const uniqueString = uuidv4();
  const newUser = await UserVerification.register(
    {
      email,
      name,
      lastName,
      uniqueString,
      username,
      dwp: true,
      createdAt: Date.now(),
      expiresAt: Date.now() + 21600000,
      verified: false,
    },
    password
  );
  transporter.sendMail(
    {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Verify Acount!",
      html: emailFormat(newUser.id, newUser.uniqueString),
    },
    (err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          message:
            "Ups! We have a problem sending the email, please try again in 5 minutes",
        });
      } else {
        res.status(201).json({
          success: true,
          message:
            "A mail already has been sent to this mail please check you mailbox and spam folder or wait 5 minutes to sign up again",
        });
      }
    }
  );
});
// @desc    Verificate status of a new user
// @route   GET /api/users/status/:id/:verifyid
// @access  Public
module.exports.verificationUserStatus = asyncHandler(async (req, res) => {
  const user = await UserVerification.findById(req.params.id);
  if (
    user &&
    user.uniqueString === req.params.verifyid &&
    Date.now() < user.expiresAt
  ) {
    res.json({
      status: true,
      message: "User exist and is able to be verified",
    });
  } else {
    if (user) {
      if (user.uniqueString !== req.params.verifyid) {
        throw new Error("Not found");
      }
      await UserVerification.deleteOne({ id: user._id });
    }
    throw new Error(
      "You exceeded the waiting time, you need to register again"
    );
  }
});
// @desc    Verificate a new user
// @route   GET /api/users/verify/:id/:verifyid
// @access  Public
module.exports.verificationUserLink = asyncHandler(async (req, res) => {
  const newUser = await UserVerification.findById(req.params.id).populate([
    "salt",
    "hash",
  ]);
  if (
    newUser.uniqueString === req.params.verifyid &&
    Date.now() < newUser.expiresAt
  ) {
    const userVerified = await User.create({
      lastName: newUser.lastName,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      dwp: newUser.dwp,
      hash: newUser.hash,
      salt: newUser.salt,
    });
    await UserVerification.deleteOne({ id: newUser._id });
    res.json({ message: "User Verified, your account is ready" });
  } else {
    await UserVerification.deleteOne({ id: newUser._id });
    throw new Error(
      "You exceeded the waiting time, you need to register again"
    );
  }
});

module.exports.getLoginData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        username: user.username,
        userType: user.userType,
        profileImage: user.profileImage,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle other potential errors, e.g., database errors
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.forgotPassword = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  const userFP = await UserForgotPassword.findOne({ email: email });
  if (!user) {
    res.status(400);
    throw new Error(`User with email: '${email}',  not found please Sign up`);
  }
  if (userFP) {
    if (Date.now() > userFP.expiresAt.getTime()) {
      throw new Error("Link Expired");
    } else if (userFP.createdAt.getTime() + 300000 > Date.now()) {
      res.status(400);
      throw new Error(
        `Check email to reset password or try again in ${Math.ceil(
          (userFP.createdAt.getTime() + 300000 - Date.now()) / 60000
        )} minutes`
      );
    } else if (userFP.createdAt.getTime() + 300000 < Date.now()) {
      await UserForgotPassword.deleteOne({ email: email });
    }
  }
  const uniqueString = uuidv4();
  const newUser = await UserForgotPassword.create({
    email: email,
    uniqueString: uniqueString,
    createdAt: Date.now(),
    expiresAt: Date.now() + 1800000,
  });
  transporter.sendMail(
    {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Axia-Change Password!",
      html: emailFormatForgotPD(newUser.id, newUser.uniqueString),
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ success: false, error: err });
      } else {
        res.status(201).json({
          message:
            "A mail already has been sent to this mail please check you mailbox and spam folder or wait 5 minutes to sign up again",
        });
      }
    }
  );

  //res.json({ message: "empty" })
});
module.exports.forgotPasswordStatus = asyncHandler(async (req, res) => {
  const user = await UserForgotPassword.findById(req.params.id);
  if (
    user &&
    user.uniqueString === req.params.verifyid &&
    Date.now() < user.expiresAt
  ) {
    res.json({
      status: true,
      message: "User exist and is able to be reset password",
    });
  } else {
    if (user) {
      if (user.uniqueString !== req.params.verifyid) {
        throw new Error("Not found");
      }
      await UserForgotPassword.deleteOne({ id: user._id });
    }
    throw new Error("You exceeded the waiting time, you need to request again");
  }
});
module.exports.forgotPasswordChange = asyncHandler(async (req, res) => {
  const userForgot = await UserForgotPassword.findById(req.params.id);
  if (
    userForgot &&
    userForgot.uniqueString === req.params.verifyid &&
    Date.now() < userForgot.expiresAt
  ) {
    await UserForgotPassword.deleteOne({ id: userForgot._id });
    const user = await User.findOne({ email: userForgot.email });
    if (user.email !== req.body.email) {
      res.status(404);
      throw new Error("Email not found");
    }
    await user.setPassword(req.body.newPassword, function (err, user) {
      user.dwp = true;
      user.save();
    });
    res.json({ message: "Your password has been updated" });
  } else {
    if (userForgot) {
      if (userForgot.uniqueString !== req.params.verifyid) {
        throw new Error("Not found");
      }
      await UserForgotPassword.deleteOne({ id: userForgot._id });
    }
    throw new Error("You exceeded the waiting time, you need to request again");
  }
});
module.exports.logout = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.localPassport = (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    username: user.username,
    userType: user.userType,
    profileImage: user.profileImage,
  });
};

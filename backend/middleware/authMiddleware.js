const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const fetch = require("isomorphic-fetch");

module.exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    throw new Error("User not login");
  } else {
    next();
  }
});
module.exports.isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.userType !== "Admin") {
    res.status(401);
    throw new Error("You dont have permisison to do this");
  } else {
    next();
  }
});

module.exports.validCaptchaToken = async (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    next();
  } else {
    const response_key = req.body.token || req.body.user.token;
    const secret_key = process.env.GOOGLE_RECAPTCHA_SECRET;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`;
    fetch(url, {
      method: "post",
    })
      .then((response) => response.json())
      .then((google_response) => {
        // google_response is the object return by
        // google as a response
        if (google_response.success == true) {
          //   if captcha is verified
          //return res.send({ response: "Successful" });
          next();
        } else {
          // if captcha is not verified
          res.status(409);
          return res.json({
            message: "Captcha not valid",
          });
        }
      })
      .catch((error) => {
        // Some error while verify captcha
        return res.json({ error });
      });
  }
};

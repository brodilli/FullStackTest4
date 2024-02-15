const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const {
  validCaptchaToken,
  isLoggedIn,
  lala,
} = require("../middleware/authMiddleware");

// Signup
router.post("/signup", validCaptchaToken, userController.registerUser);
router.get("/status/:id/:verifyid", userController.verificationUserStatus);
router.get("/verify/:id/:verifyid", userController.verificationUserLink);
// Login
router.post(
  "/login",
  validCaptchaToken,
  passport.authenticate("local", {
    failureMessage: "Username or password is wrong",
  }),
  userController.localPassport
);
// Forgot Password
router.post("/forgotpassword", userController.forgotPassword);
router.get(
  "/forgotpassword/:id/:verifyid",
  userController.forgotPasswordStatus
);
router.put(
  "/forgotpassword/:id/:verifyid",
  userController.forgotPasswordChange
);
// isLogged
router.get("/islogged", isLoggedIn, userController.getLoginData);
// Logout
router.get("/logout", userController.logout);
// Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// Google Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login?error=invalidEmailGoogle",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(
      "http://localhost:3000/login?username=" +
        req.user.username +
        "&userType=" +
        req.user.userType
    );
  }
);
// Twitter
router.get("/auth/twitter", passport.authenticate("twitter"));
// Twitter Callback
router.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000/login?error=invalidEmailTwitter",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(
      "http://localhost:3000/login?username=" +
        req.user.username +
        "&userType=" +
        req.user.userType
    );
  }
);
// Facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
// Facebook Callback
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login?error=invalidEmailFacebook",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(
      "http://localhost:3000/login?username=" +
        req.user.username +
        "&userType=" +
        req.user.userType
    );
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Adviser Routes
router
  .route("/advisers")
  .get(isLoggedIn, isAdmin, adminController.viewAdvisers)
  .post(isLoggedIn, isAdmin, adminController.createAdviser);

router
  .route("/advisers/:id")
  .get(isLoggedIn, isAdmin, adminController.viewAdviser)
  .put(isLoggedIn, isAdmin, adminController.editAdviser)
  .delete(isLoggedIn, isAdmin, adminController.deleteAdviser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const developmentController = require("../controllers/developmentController");

router.route("/").get(isLoggedIn, developmentController.viewDevelopments);
router
  .route("/:id/limits")
  .get(isLoggedIn, developmentController.filterLimitsByDevelopment);

module.exports = router;

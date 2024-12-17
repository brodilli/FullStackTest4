const express = require("express");
const router = express.Router();
const lookupController = require("../controllers/lookupController");
const wrapAsync = require("../errors/wrapAsync");

router.route("/categories").get(wrapAsync(lookupController.viewCategories));
router.route("/brands").get(wrapAsync(lookupController.viewBrand));
router.route("/types").get(wrapAsync(lookupController.viewTypess));

module.exports = router;

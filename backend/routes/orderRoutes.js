const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

router.route("/").get(isLoggedIn, orderController.viewOrders);
router.route("/export").post(isLoggedIn, orderController.exportOrders);
router
  .route("/:id")
  .get(isLoggedIn, orderController.viewOrder)
  .put(isLoggedIn, orderController.editOrder);

module.exports = router;

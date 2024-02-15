const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { isLoggedIn } = require("../middleware/authMiddleware");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Admin GET ALL
router
  .route("/")
  .get(isLoggedIn, productController.viewProducts)
  .post(isLoggedIn, upload.array("files", 1), productController.createProduct);
router.get("/:id", productController.viewProduct);
router.post("/search", productController.searchProducts);
module.exports = router;

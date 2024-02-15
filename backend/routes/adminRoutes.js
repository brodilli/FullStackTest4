const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Category Routes
router
  .route("/categories")
  .get(isLoggedIn, isAdmin, adminController.viewCategories)
  .post(isLoggedIn, isAdmin, adminController.createCategory);

router
  .route("/categories/:id")
  .get(isLoggedIn, isAdmin, adminController.viewCategory)
  .put(isLoggedIn, isAdmin, adminController.editCategory)
  .delete(isLoggedIn, isAdmin, adminController.deleteCategory);
// Brand Routes
router
  .route("/brands")
  .get(isLoggedIn, isAdmin, adminController.viewBrands)
  .post(isLoggedIn, isAdmin, adminController.createBrand);
router
  .route("/brands/:id")
  .get(isLoggedIn, isAdmin, adminController.viewBrand)
  .put(isLoggedIn, isAdmin, adminController.editBrand)
  .delete(isLoggedIn, isAdmin, adminController.deleteBrand);
// Parcel Routes
router
  .route("/parcels")
  .get(isLoggedIn, isAdmin, adminController.viewParcels)
  .post(isLoggedIn, isAdmin, adminController.createParcel);
router
  .route("/parcels/:id")
  .get(isLoggedIn, isAdmin, adminController.viewParcel)
  .put(isLoggedIn, isAdmin, adminController.editParcel)
  .delete(isLoggedIn, isAdmin, adminController.deleteParcel);
// Product  Routes
router
  .route("/products")
  .get(isLoggedIn, isAdmin, adminController.viewProducts)
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("files", 3),
    adminController.createProduct
  );
router
  .route("/products/:id")
  .get(isLoggedIn, isAdmin, adminController.viewProduct)
  .put(
    isLoggedIn,
    isAdmin,
    upload.array("files", 1),
    adminController.editProduct
  )
  .delete(isLoggedIn, isAdmin, adminController.deleteProduct);
// Desarrollo  Routes
router
  .route("/developments")
  .get(isLoggedIn, isAdmin, adminController.viewDevelopments)
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("files", 1),
    adminController.createDevelopment
  );
router
  .route("/developments/:id")
  .get(isLoggedIn, isAdmin, adminController.viewDevelopment)
  .put(
    isLoggedIn,
    isAdmin,
    upload.array("files", 1),
    adminController.editDevelopment
  )
  .delete(isLoggedIn, isAdmin, adminController.deleteDevelopment);

// Order  Routes
router
  .route("/orders")
  .get(isLoggedIn, isAdmin, adminController.viewOrders)
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("files", 2),
    adminController.createOrder
  );
router
  .route("/orders/export")
  .post(isLoggedIn, isAdmin, adminController.exportOrders);
router
  .route("/orders/:id")
  .get(isLoggedIn, isAdmin, adminController.viewOrder)
  .put(isLoggedIn, isAdmin, adminController.editOrder)
  .delete(isLoggedIn, isAdmin, adminController.deleteOrder);
// Discount Routes
router
  .route("/discounts")
  .get(isLoggedIn, isAdmin, adminController.viewDiscounts)
  .post(isLoggedIn, isAdmin, adminController.createDiscount);

router
  .route("/discounts/:id")
  .get(isLoggedIn, isAdmin, adminController.viewDiscount)
  .put(isLoggedIn, isAdmin, adminController.editDiscount)
  .delete(isLoggedIn, isAdmin, adminController.deleteDiscount);
// Marketplace Routes
router
  .route("/marketplaces")
  .get(isLoggedIn, isAdmin, adminController.viewMarketplaces)
  .post(isLoggedIn, isAdmin, adminController.createMarketplace);

router
  .route("/marketplaces/:id")
  .get(isLoggedIn, isAdmin, adminController.viewMarketplace)
  .put(isLoggedIn, isAdmin, adminController.editMarketplace)
  .delete(isLoggedIn, isAdmin, adminController.deleteMarketplace);
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
// Order Routes
/*router
  .route("/orders")
  .get(isLoggedIn, isAdmin, adminController.viewOrders)
  .put(isLoggedIn, isAdmin, adminController.editOrder)
  .delete(isLoggedIn, isAdmin, adminController.deleteOrder);
router.route("/orders/:id").get(isLoggedIn, isAdmin, adminController.viewOrder);
router
  .route("/orders/:id/email")
  .get(isLoggedIn, isAdmin, adminController.sendEmail);
router
  .route("/orders/:id/status")
  .put(isLoggedIn, isAdmin, adminController.updateOrderStatus);
router
  .route("/orders/:id/update")
  .put(isLoggedIn, isAdmin, adminController.updateOrderItemsStatus);*/

module.exports = router;

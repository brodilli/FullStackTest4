const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin } = require("../middleware/authMiddleware");
const adminController = require("../controllers/adminController");
const wrapAsync = require("../errors/wrapAsync");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Guest Routes
router
  .route("/guest")
  .get(isLoggedIn, isAdmin, adminController.viewUsers)
  .post(isLoggedIn, isAdmin, adminController.createUser);

router
  .route("/guests/:id")
  .get(isLoggedIn, isAdmin, adminController.viewUser)
  .put(isLoggedIn, isAdmin, adminController.editUser)
  .delete(isLoggedIn, isAdmin, adminController.deleteUser);

/* ------------------------------- Product Routes ------------------------------------ */
router
  .route("/products")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewProducts))
  .post(
    isLoggedIn,
    isAdmin,
    upload.array("files", 1),
    wrapAsync(adminController.createProduct)
  );
router
  .route("/products/:id")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewProduct))
  .put(
    isLoggedIn,
    isAdmin,
    upload.array("files", 1),
    wrapAsync(adminController.editProduct)
  )
  .delete(isLoggedIn, isAdmin, adminController.deleteProduct);
/* ------------------------------- End Product Routes ------------------------------------ */

/* ------------------------------- Lookups Routes ------------------------------------ */
router
  .route("/lookups")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewLookups))
  .post(isLoggedIn, isAdmin, wrapAsync(adminController.createLookup));

router
  .route("/lookups-groups")
  .get(
    isLoggedIn,
    isAdmin,
    wrapAsync(adminController.viewLookupsAttributeGroups)
  );

router
  .route("/lookups/:id")
  .get(isLoggedIn, isAdmin, wrapAsync(adminController.viewLookup))
  .put(isLoggedIn, isAdmin, wrapAsync(adminController.editLookup))
  .delete(isLoggedIn, isAdmin, wrapAsync(adminController.deleteLookup));
/* ------------------------------- End Lookups Routes ------------------------------------ */

module.exports = router;

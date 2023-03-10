const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { createProductReview } = require("../controllers/userController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticateUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticateUser, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteReview);

module.exports = router;

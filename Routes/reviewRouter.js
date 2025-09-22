const express = require("express");
const Router = express.Router({ mergeParams: true });
const reviewController = require("../Controllers/reviewController");
const authController = require("../Controllers/authController");

Router.route("/")
  .post(authController.isAuthenticated, reviewController.addReview)
  .get(authController.isAuthenticated, reviewController.getReviews);

Router.route("/:id").delete(
  authController.isAuthenticated,
  reviewController.deleteReview
);

module.exports = Router;

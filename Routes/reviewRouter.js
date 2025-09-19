const express = require("express");
const Router = express.Router();
const reviewController = require("../Controllers/reviewController");
const authController = require("../Controllers/authController");

Router.route("/all").get(reviewController.getReviews);
Router.route("/:bookId")
  .post(authController.isAuthenticated, reviewController.addReview)
  .get(authController.isAuthenticated, reviewController.getReview);

module.exports = Router;

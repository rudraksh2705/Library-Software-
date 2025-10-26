const express = require("express");
const Router = express.Router();
const reviewController = require("../Controllers/reviewController");
const authController = require("../Controllers/authController");

// Create review (authenticated users only)
Router.post(
  "/create",
  authController.isAuthenticated,
  reviewController.createReview
);

// Get all reviews for a book
Router.get("/book/:bookId", reviewController.getBookReviews);

// Get my reviews
Router.get(
  "/my-reviews",
  authController.isAuthenticated,
  reviewController.getMyReviews
);

// Update review
Router.patch(
  "/update/:reviewId",
  authController.isAuthenticated,
  reviewController.updateReview
);

// Delete review
Router.delete(
  "/delete/:reviewId",
  authController.isAuthenticated,
  reviewController.deleteReview
);

module.exports = Router;

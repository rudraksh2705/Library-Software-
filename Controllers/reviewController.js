const catchAsync = require("../Utils/catchAsync");
const Review = require("../Models/reviewModel");
const Book = require("../Models/bookModel");
const appError = require("../Utils/appError");

// Create a review
exports.createReview = catchAsync(async (req, res, next) => {
  const { bookId, rating, comment } = req.body;
  const user = req.user;

  if (!bookId || !rating || !comment) {
    return next(
      new appError("Please provide book ID, rating, and comment", 400)
    );
  }

  if (rating < 1 || rating > 5) {
    return next(new appError("Rating must be between 1 and 5", 400));
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  // Check if user has already reviewed this book
  const existingReview = await Review.findOne({
    "user.id": user._id,
    book: bookId,
  });

  if (existingReview) {
    return next(new appError("You have already reviewed this book", 400));
  }

  // Create review
  const review = await Review.create({
    user: {
      id: user._id,
      name: user.name,
    },
    book: bookId,
    rating,
    comment,
  });

  // Update book ratings
  book.totalRatings += 1;
  const currentTotal = book.averageRating * (book.totalRatings - 1);
  book.averageRating = (currentTotal + rating) / book.totalRatings;
  await book.save();

  res.status(201).json({
    status: "success",
    message: "Review submitted successfully",
    review,
  });
});

// Get all reviews for a book
exports.getBookReviews = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const reviews = await Review.find({ book: bookId })
    .populate("user.id", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

// Get my reviews
exports.getMyReviews = catchAsync(async (req, res, next) => {
  const user = req.user;

  const reviews = await Review.find({ "user.id": user._id })
    .populate("book", "title author")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

// Update review
exports.updateReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const { rating, comment } = req.body;
  const user = req.user;

  if (!rating || !comment) {
    return next(new appError("Please provide rating and comment", 400));
  }

  if (rating < 1 || rating > 5) {
    return next(new appError("Rating must be between 1 and 5", 400));
  }

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new appError("Review not found", 404));
  }

  if (review.user.id.toString() !== user._id.toString()) {
    return next(new appError("You can only update your own reviews", 403));
  }

  const oldRating = review.rating;
  review.rating = rating;
  review.comment = comment;
  await review.save();

  // Update book average rating
  const book = await Book.findById(review.book);
  const currentTotal = book.averageRating * book.totalRatings;
  const newTotal = currentTotal - oldRating + rating;
  book.averageRating = newTotal / book.totalRatings;
  await book.save();

  res.status(200).json({
    status: "success",
    message: "Review updated successfully",
    review,
  });
});

// Delete review
exports.deleteReview = catchAsync(async (req, res, next) => {
  const { reviewId } = req.params;
  const user = req.user;

  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new appError("Review not found", 404));
  }

  if (review.user.id.toString() !== user._id.toString()) {
    return next(new appError("You can only delete your own reviews", 403));
  }

  const book = await Book.findById(review.book);
  book.totalRatings -= 1;

  if (book.totalRatings === 0) {
    book.averageRating = 0;
  } else {
    const currentTotal = book.averageRating * (book.totalRatings + 1);
    book.averageRating = (currentTotal - review.rating) / book.totalRatings;
  }

  await book.save();
  await Review.findByIdAndDelete(reviewId);

  res.status(200).json({
    status: "success",
    message: "Review deleted successfully",
  });
});

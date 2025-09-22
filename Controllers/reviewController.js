const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const Review = require("../Models/reviewModel");
const Books = require("../Models/bookModel");
const appError = require("../Utils/ErrorHandlers/appError");
const secret = process.env.JWT_SECRET;

exports.addReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { rating, description } = req.body;

  console.log(req.user);
  const user = req.user.id;

  const alreadyPresent = await Review.findOne({ user, book: bookId });

  if (alreadyPresent) {
    return next(new appError("You have already responded", 400));
  }

  const book = await Books.findById(bookId);

  if (!book) {
    return next(new appError("No such a book", 401));
  }

  if (!rating || !description) {
    return next(new appError("Please fill all fields", 401));
  }

  const review = await Review.create({
    rating,
    description,
    user,
    book: bookId,
  });
  res.status(201).json({
    status: "success",
    review,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  const { bookId } = req.params;

  if (bookId) {
    filter = { book: bookId };
  }
  const reviews = await Review.find(filter).populate({
    path: "user",
    select: "name email",
  });

  if (!reviews) {
    return next(new appError("No reviews till now", 401));
  }

  res.status(201).json({
    status: "succcess",
    reviews,
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const review = await Review.findById(id);

  console.log(id, review);

  if (!review) {
    return next(new appError("No such a review", 404));
  }

  await Review.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    message: "deleted",
  });
});

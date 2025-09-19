const jwt = require("jsonwebtoken");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const Review = require("../Models/reviewModel");
const Books = require("../Models/bookModel");
const appError = require("../Utils/ErrorHandlers/appError");
const secret = process.env.JWT_SECRET;

exports.addReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;

  const book = await Books.findById(bookId);
  if (!book) {
    return next(new appError("No such a book", 401));
  }

  const { token } = req.cookies;
  const { rating, description } = req.body;
  const decoded = jwt.verify(token, secret);
  const user_id = decoded.id;

  const { reviews } = book;

  for (let el of reviews) {
    const { user } = await Review.findById(el);
    if (user.toString() === user_id) {
      return next(new appError("You have already Reviewed", 401));
    }
  }

  const data = await Review.create({
    book: bookId,
    user: user_id,
    rating,
    description,
  });

  await Books.findByIdAndUpdate(bookId, { $push: { reviews: data._id } });

  res.status(201).json({
    status: "success",
    data,
  });
});

exports.getReviews = catchAsync(async (req, res, next) => {
  const data = await Review.find()
    .populate({
      path: "user",
      select: "name email",
    })
    .populate({
      path: "book",
      select: "title author description",
    });

  if (!data) {
    return next(new appError("No data Found", 401));
  }

  res.status(201).json({
    status: "success",
    data,
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const reviews = await Review.find({ book: bookId })
    .populate({ path: "user", select: "name email" })
    .select("-book");
  if (reviews.length === 0) {
    return next(new appError("No reviews found for this book", 401));
  }
  res.status(201).json({
    status: "success",
    reviews,
  });
});

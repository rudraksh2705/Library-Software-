const catchAsync = require("../Utils/catchAsync");
const Request = require("../Models/requestModel");
const Book = require("../Models/bookModel");
const appError = require("../Utils/appError");
const Borrow = require("../Models/borrowModel");

// Create a book request by student
exports.createRequest = catchAsync(async (req, res, next) => {
  const { bookId } = req.body;
  const user = req.user;

  if (!bookId) {
    return next(new appError("Please provide a book ID", 400));
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  if (book.quantity === 0) {
    return next(new appError("Book is currently unavailable", 400));
  }

  // Check if user already has a pending request for this book
  const existingRequest = await Request.findOne({
    "user.id": user._id,
    "book.id": bookId,
    status: "pending",
  });

  if (existingRequest) {
    return next(
      new appError("You already have a pending request for this book", 400)
    );
  }

  // Check if user has already borrowed this book
  const borrowedBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.returned === false
  );

  if (borrowedBook) {
    return next(new appError("You already have this book borrowed", 400));
  }

  const request = await Request.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: {
      id: book._id,
      title: book.title,
    },
  });

  res.status(201).json({
    status: "success",
    message: "Book request submitted successfully",
    request,
  });
});

// Get all requests (for librarians/admins)
exports.getAllRequests = catchAsync(async (req, res, next) => {
  const { status } = req.query;
  let filter = {};

  if (status) {
    filter.status = status;
  }

  const requests = await Request.find(filter)
    .populate("user.id", "name email")
    .populate("book.id", "title author quantity")
    .populate("approvedBy", "name")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: requests.length,
    data: requests,
  });
});

// Get my requests (for students)
exports.getMyRequests = catchAsync(async (req, res, next) => {
  const user = req.user;

  const requests = await Request.find({ "user.id": user._id })
    .populate("book.id", "title author quantity")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    results: requests.length,
    data: requests,
  });
});

// Approve request (for librarians)
exports.approveRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const user = req.user;

  const request = await Request.findById(requestId);
  if (!request) {
    return next(new appError("Request not found", 404));
  }

  if (request.status !== "pending") {
    return next(new appError("Request is already processed", 400));
  }

  const book = await Book.findById(request.book.id);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  if (book.quantity === 0) {
    return next(new appError("Book is no longer available", 400));
  }

  request.status = "approved";
  request.approvedDate = new Date();
  request.approvedBy = user._id;
  await request.save();

  res.status(200).json({
    status: "success",
    message: "Request approved successfully",
    request,
  });
});

// Reject request (for librarians)
exports.rejectRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const { reason } = req.body;
  const user = req.user;

  const request = await Request.findById(requestId);
  if (!request) {
    return next(new appError("Request not found", 404));
  }

  if (request.status !== "pending") {
    return next(new appError("Request is already processed", 400));
  }

  request.status = "rejected";
  request.rejectedDate = new Date();
  request.approvedBy = user._id;
  request.reason = reason || "Not specified";

  await request.save();

  res.status(200).json({
    status: "success",
    message: "Request rejected successfully",
    request,
  });
});

// Cancel request (for students)
exports.cancelRequest = catchAsync(async (req, res, next) => {
  const { requestId } = req.params;
  const user = req.user;

  const request = await Request.findById(requestId);
  if (!request) {
    return next(new appError("Request not found", 404));
  }

  if (request.user.id.toString() !== user._id.toString()) {
    return next(new appError("You can only cancel your own requests", 403));
  }

  if (request.status !== "pending") {
    return next(new appError("Cannot cancel a processed request", 400));
  }

  await Request.findByIdAndDelete(requestId);

  res.status(200).json({
    status: "success",
    message: "Request cancelled successfully",
  });
});

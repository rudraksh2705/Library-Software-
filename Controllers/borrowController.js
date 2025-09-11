const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const appError = require("../Utils/ErrorHandlers/appError");
const Borrow = require("../Models/borrowModel");
const Book = require("../Models/bookModel");
const User = require("../Models/userModel");
const app = require("../app");

exports.recordBorrowedBook = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const book_id = req.params.id;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new appError("User not Found", 404));
  }

  const book = await Book.findById(book_id);

  if (!book) {
    return next(new appError("Book not Found", 404));
  }

  if (book.quantity === 0) {
    return next(new appError("Book is not available", 400));
  }

  const isAlreadyBorrowed = user.borrowedBooks.find(
    (ele) => ele.bookId.toString() === book_id
  );

  if (isAlreadyBorrowed) {
    return next(new appError("This book is already Borrowed"));
  }

  book.quantity -= 1;
  book.availability = book.quantity > 0;

  await book.save();

  user.borrowedBooks.push({
    bookId: book_id,
    bookTitle: book.title,
    borrowDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await Borrow.create({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    book: book._id,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    price: book.price,
  });

  res.status(200).json({
    success: true,
    message: "Borrowed Book recorded successfully",
  });
});

exports.getBorrowedBooksforAdmin = catchAsync(async (req, res, next) => {});

exports.borrowedBooks = catchAsync(async (req, res, next) => {});

exports.returnBorrowedBook = catchAsync(async (req, res, next) => {});

const catchAsync = require("../Utils/catchAsync");
const Book = require("../Models/bookModel");
const User = require("../Models/userModel");
const appError = require("../Utils/appError");

exports.addBook = catchAsync(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;
  if (!title || !author || !description || !price || !quantity) {
    return next(new appError("Please fill all fields", 400));
  }
  const book = await Book.create({
    title,
    author,
    description,
    price,
    quantity,
    averageRating: 0,
    totalRatings: 0,
  });
  res.status(201).json({
    status: "success",
    message: "Books added",
    book,
  });
});

exports.getBookById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findById(id);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: book,
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, author, description, price, quantity } = req.body;

  const book = await Book.findById(id);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  if (title) book.title = title;
  if (author) book.author = author;
  if (description) book.description = description;
  if (price) book.price = price;
  if (quantity !== undefined) book.quantity = quantity;

  book.availability = book.quantity > 0;

  await book.save();

  res.status(200).json({
    status: "success",
    message: "Book updated successfully",
    data: book,
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json({
    status: "success",
    size: books.length,
    data: books,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  if (!book) {
    return next(new appError("Book does not exist", 401));
  }
  await Book.deleteOne({ _id: id });
  res.status(204).json();
});

const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const Books = require("../Models/bookModel");
const appError = require("../Utils/ErrorHandlers/appError");

exports.addBooks = catchAsync(async (req, res, next) => {
  const { title, author, description, price, quantity } = req.body;

  if (!title || !author || !description || !price || !quantity) {
    return next(new appError("Please fill all fields", 400));
  }

  const book = await Books.create({
    title,
    author,
    description,
    price,
    quantity,
  });

  res.status(201).json({
    status: "success",
    message: "data added succesfuly",
    data: book,
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const book = await Books.findById(id);

  if (!book) {
    return next(new appError("Book not found", 401));
  }

  await Books.deleteOne(id);
  res.status(204).json({
    status: "success",
    message: "book deleted",
  });
});

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const data = await Books.find().populate({
    path: "reviews",
    populate: {
      path: "user",
      select: "name email",
    },
  });

  console.log("hi2");

  if (!data) {
    return next(new appError("No data Found", 401));
  }

  res.status(201).json({
    status: "success",
    length: data.length,
    data,
  });
});

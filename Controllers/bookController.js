const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const Books = require("../Models/bookModel");
const appError = require("../Utils/ErrorHandlers/appError");

class ApiFeatures {
  constructor(queryObj, query) {
    this.queryObj = queryObj;
    this.query = query;
  }

  filter() {
    let tempQueryObj = { ...this.queryObj };
    const array = ["page", "limit", "fields", "sort"];
    array.forEach((arg) => {
      delete tempQueryObj[arg];
    });
    let queryStr = JSON.stringify(tempQueryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (!this.queryObj.sort) {
      this.query = this.query.sort("-price");
    } else {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  async pagination() {
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    if (this.queryObj.page) {
      const numTours = await Books.countDocuments();
      if (skip >= numTours) throw new Error("This page does not exist");
    }
    return this;
  }
}

exports.getAllBooks = catchAsync(async (req, res, next) => {
  const obj = new ApiFeatures(req.query, Books.find());
  obj.filter().sort();
  await obj.pagination();
  const data = await obj.query;

  if (!data) {
    return next(new appError("No data Found", 401));
  }

  res.status(201).json({
    status: "success",
    length: data.length,
    data,
  });
});

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
    message: "book added succesfuly",
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

exports.getBook = catchAsync(async (req, res, next) => {
  const id = req.params.bookId;
  const book = await Books.findById(id);
  if (!book) {
    return next(new appError("Book not Found", 400));
  }
  res.status(200).json({
    status: "success",
    data: book,
  });
});

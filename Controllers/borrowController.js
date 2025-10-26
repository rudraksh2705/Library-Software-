const catchAsync = require("../Utils/catchAsync");
const Book = require("../Models/bookModel");
const appError = require("../Utils/appError");
const User = require("../Models/userModel");
const Borrow = require("../Models/borrowModel");
const calculateFine = require("../Utils/fineCalculator");

exports.recordBorrowedBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.body;

  const book = await Book.findById(id);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new appError("User not Found", 404));
  }

  if (book.quantity === 0) {
    return next(new appError("Book not available", 400));
  }

  const isAlreadyBorrowed = user.borrowedBooks.find((book) => {
    return book.bookId.toString() === id && book.returned === false;
  });

  if (isAlreadyBorrowed) {
    return next(new appError("You have already borrowed this book", 400));
  }

  book.quantity -= 1;
  book.availability = book.quantity > 0;

  await book.save();

  /* {
          bookId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Borrow",
          },
          returned: {
            type: Boolean,
            default: false,
          },
          bookTitle: String,
          borrowedDate: Date,
          dueDate: Date,
        },*/
  user.borrowedBooks.push({
    bookId: book._id,
    bookTitle: book.title,
    borrowedDate: new Date(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  await user.save();

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
    success: "true",
    message: "borrowed book recorded successfully",
  });
});

exports.returnBook = catchAsync(async (req, res, next) => {
  const { bookId } = req.params;
  const { email } = req.body;

  // 1. Check if book exists
  const book = await Book.findById(bookId);
  if (!book) {
    return next(new appError("Book not found", 404));
  }

  // 2. Check if user exists and is verified
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new appError("User not found", 404));
  }

  // 3. Check if user actually borrowed this book
  const borrowedBook = user.borrowedBooks.find(
    (b) => b.bookId.toString() === bookId && b.returned === false
  );

  if (!borrowedBook) {
    return next(new appError("You have not borrowed this book", 400));
  }

  // 4. Mark the borrowed book as returned
  borrowedBook.returned = true;
  await user.save();

  // 5. Increase book quantity
  book.quantity++;
  book.availability = book.quantity > 0;
  await book.save();

  // 6. Find borrow record
  const borrow = await Borrow.findOne({
    book: bookId,
    "user.email": email,
    returnDate: null,
  });

  if (!borrow) {
    return next(new appError("Book not borrowed", 400));
  }

  // 7. Update return date and fine
  borrow.returnDate = new Date();
  const fine = calculateFine(borrow.dueDate);
  borrow.fine = fine;
  await borrow.save();

  // 8. Send response
  res.status(201).json({
    status: "success",
    message:
      fine !== 0
        ? `Book returned successfully with a fine of ₹${fine.toFixed(2)}`
        : "Book returned successfully. No fine applied.",
    fine,
  });
});

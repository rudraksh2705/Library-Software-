const bcrypt = require("bcryptjs");

const Books = require("../Models/bookModel");
const Issued = require("../Models/issuedModel");
const appError = require("../Utils/ErrorHandlers/appError");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const sendEmail = require("../Utils/Email/sendEmail");
const issuedVerification = require("../Utils/Email/MailTemplates/issuedVerificationTemplate");
const Borrowed = require("../Models/borrowedModel");

exports.requestOTP = catchAsync(async (req, res, next) => {
  const user = req.user.id;
  const { title } = req.body;
  const book = await Books.findOne({ title });
  if (!book) {
    return next(new appError("No such a book", 400));
  }
  const issued = await Issued.findOne({
    user,
    book: book._id,
    borrowed: false,
  });

  if (!issued) {
    return next(new appError("This book has not been issued to you", 400));
  }
  if (Date.now() >= issued.issuingExpires.getTime()) {
    return next(
      new appError("Your issuing time has expired for this book", 400)
    );
  }

  console.log("ji");
  const code = issued.generateOtp().toString();
  const verificationCode = await bcrypt.hash(code, 10);
  issued.verificationCode = verificationCode;
  issued.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
  await issued.save();

  const emailTemplate = issuedVerification(req.user.name, title, code);
  return await sendEmail(
    res,
    req.user.email,
    "Veification Code for Borrowing Book",
    emailTemplate,
    "Mail sent successfully"
  );
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  let { otp, title } = req.body;
  if (!otp) {
    return next(new appError("Kindly enter otp", 401));
  }
  otp = +otp;
  const book = await Books.findOne({ title });
  const user = await Issued.findOne({ user: req.user.id, book: book._id });

  if (!user.verificationCode) {
    return next(new appError("You can't access this service", 401));
  }

  const otpVerified = await user.verifyCode(otp);
  if (!otpVerified) {
    return next(new appError("Incorrect Otp", 401));
  }

  if (Date.now() >= user.verificationCodeExpires) {
    return next(new appError("Your otp has expired", 400));
  }

  user.verificationCode = null;
  user.verificationCodeExpires = null;
  user.borrowingVerified = true;
  await user.save();
  res.status(200).json({
    status: "success",
    message:
      "You have been verified and show this page to any librarian in library",
  });
});

exports.verifiedIssues = catchAsync(async (req, res, next) => {
  const users = await Issued.find({ borrowingVerified: true });
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.borrowFinally = catchAsync(async (req, res, next) => {
  const { days } = req.body; // to be filled by librarian only
  const id = req.params.issueId;
  const issuedData = await Issued.findById(id);
  issuedData.borrowed = true;
  await issuedData.save();
  const borrowed = await Borrowed.create({
    book: issuedData.book,
    user: issuedData.user,
    dueDate: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  });
  res.status(201).json({
    status: "success",
    data: borrowed,
  });
});

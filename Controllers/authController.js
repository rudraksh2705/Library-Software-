const appError = require("../Utils/ErrorHandlers/appError");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const sendVerificationCode = require("../Utils/Email/sendVerificationCode");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

exports.register = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return next(new appError("provide all fields", 401));
  }

  const isRegistered = await User.findOne({ email, accountVerified: true });

  if (isRegistered) {
    return next(new appError("A user already exists with this email", 401));
  }

  const registerationAttemptsByUser = await User.find({
    email,
    accountVerified: false,
  });

  if (registerationAttemptsByUser.length >= 5) {
    return next(
      new appError(
        "Too Many Attempts for registration . You need to wait for some time",
        400
      )
    );
  }

  const requestingUser = await User.create({ name, email, password });

  const verificationCode = requestingUser.generateVerificationCode();

  await requestingUser.save();

  sendVerificationCode(verificationCode, email, res);
});

exports.verify = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new appError("Email and otp are required", 401));
  }
  console.log("ok1");

  const users = await User.find({ email }).sort({ createdAt: -1 });

  console.log("ok2");
  if (users.length === 0) {
    return next(new appError("Invalid Applicant", 404));
  }

  const user = users[0];

  if (users.length > 1) {
    await User.deleteMany({ email, _id: { $ne: user._id } });
  }

  console.log(secret);
  console.log("ok3");

  if (Date.now() >= user.verificationCodeExpires) {
    next(new appError("Your time for registeration via otp is expired", 401));
  }

  if (+otp !== +user.verificationCode) {
    return next(new appError("Incorrect OTP", 401));
  }

  user.accountVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;

  await user.save();
  const token = jwt.sign({ id: user._id }, secret);

  return res.status(201).json({
    status: "success",
    message: "User Registered Successfully",
    user,
    token,
  });
});

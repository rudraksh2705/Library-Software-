const appError = require("../Utils/ErrorHandlers/appError");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const sendVerificationCode = require("../Utils/Email/sendVerificationCode");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const sendToken = require("../Utils/sendToken");

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new appError("User is already logout", 400));
  }
  const decoded = jwt.verify(token, secret);
  req.user = await User.findById(decoded.id);

  next();
});

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

  const users = await User.find({ email }).sort({ createdAt: -1 });
  if (users.length === 0) {
    return next(new appError("Invalid Applicant", 404));
  }

  const user = users[0];

  if (users.length > 1) {
    await User.deleteMany({ email, _id: { $ne: user._id } });
  }

  console.log(secret);

  if (Date.now() >= user.verificationCodeExpires) {
    next(new appError("Your time for registeration via otp is expired", 401));
  }

  if (+otp !== +user.verificationCode) {
    return next(new appError("Incorrect OTP", 401));
  }

  user.accountVerified = true;
  user.verificationCode = null;
  user.verificationCodeExpires = null;

  console.log("ok1");
  await user.save({ validateModifiedOnly: true });

  console.log("ok2");

  return sendToken(user, 200, "Account Verified", res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new appError("Provide Email and password for login", 401));
  }

  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );

  if (!user) {
    return next(new appError("No such a user with this email", 401));
  }

  const decoded = await user.check(password);

  if (!decoded) {
    return next(new appError("Password is incorrect", 401));
  }

  return sendToken(user, 200, "User Login Successful", res);
});

exports.logout = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      status: "success",
      message: "Log Out Successful",
    });
});

const appError = require("../Utils/ErrorHandlers/appError");
const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const sendVerificationCode = require("../Utils/Email/sendVerificationCode");

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

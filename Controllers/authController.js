const catchAsync = require("../Utils/catchAsync");
const User = require("../Models/userModel");
const appError = require("../Utils/appError");
const sendEmail = require("../Utils/email");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const secret = process.env.JWT_SECRET;
const bcrypt = require("bcryptjs");

const sendToken = function (id, user, message, res) {
  if (!secret) throw new Error("JWT secret not defined");

  const token = jwt.sign({ id }, secret, { expiresIn: "1h" });

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .json({
      status: "success",
      message,
      user,
    });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, password, email } = req.body;
  if (!name || !password || !email) {
    return next(new appError("Please enter all fields", 400));
  }

  const isRegistered = await User.findOne({ accountVerified: true, email });

  if (isRegistered) {
    return next(new appError("A user already exists with this email", 400));
  }

  const registrationAttemptsByUser = await User.find({
    email,
    createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) },
  });

  if (registrationAttemptsByUser.length >= 5) {
    return next(new appError("too many attemps , please try again later", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(new appError("Password length must be between 8 and 16", 400));
  }

  const user = await User.create({ name, password, email });

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.verificationCode = otp;
  user.verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);
  await user.save();

  return await sendEmail(otp, res, "Verification Code For Registering", email);
});

exports.verifyOtp = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new appError("Provide email and OTP for verification", 401));
  }

  const user = await User.findOne({ email }).sort({ createdAt: -1 });
  if (!user) {
    return next(new appError("Invalid applicant", 401));
  }
  if (otp.toString() !== user.verificationCode.toString()) {
    return next(new appError("OTP does not match", 400));
  }

  if (user.verificationCodeExpires < new Date()) {
    return next(new appError("OTP has expired", 401));
  }
  user.verificationCode = null;
  user.verificationCodeExpires = null;
  user.accountVerified = true;

  await User.deleteMany({ email, createdAt: { $lt: user.createdAt } });

  await user.save();

  return sendToken(user._id, user, "You are verified", res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new appError("email and password are required", 400));
  }

  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );
  if (!user) {
    return next(new appError("User does not exist with this email", 400));
  }

  const verify = await user.verifyPassword(password);
  if (!verify) {
    return next(new appError("Password is incorrect", 400));
  }

  return sendToken(user._id, user, "You have been logged in", res);
});

exports.isAuthenticated = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new appError("You are currently logged out", 401));
  }

  const decoded = jwt.verify(token, secret);
  req.user = await User.findById(decoded.id);
  next();
});

exports.logout = catchAsync(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      status: "success",
      message: "User logged Out succesfuly",
    });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = req.user;

  return res.status(201).json({
    status: "success",
    user,
  });
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(
      new appError("Please enter email for resetting your password", 400)
    );
  }

  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new appError("User does not exist with this email", 400));
  }
  const resetToken = user.generateForgetPasswordToken();
  console.log(resetToken);
  await user.save();

  return await sendEmail(
    resetToken,
    res,
    "Forgot Password (Andaman College)",
    email
  );
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new appError("Passwords do not match", 400));
  }
  if (password.length < 8 || password.length > 16) {
    return next(new appError("Passwords length must be between 8 and 16", 400));
  }

  const { token } = req.params;
  console.log("reset", token);
  console.log("hi");
  const resetToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: resetToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new appError("Invalid or expired token", 401));
  }
  if (user.passwordResetTokenExpires <= Date.now()) {
    return next(new appError("Token has expired", 401));
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  res.status(201).json({
    status: "success",
    message: "Password Changed successfuly",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(
      new appError(
        "CurrentPassword , newPassword and ConfirmPassoword are required",
        401
      )
    );
  }

  if (confirmPassword != newPassword) {
    return next(new appError("Passwords do not match", 401));
  }

  if (newPassword.length < 8 || newPassword.length > 16) {
    return next(new appError("Password length must be between 8 and 16", 401));
  }

  const isValid = await bcrypt.compare(currentPassword, user.password);

  if (!isValid) {
    return next(new appError("Your password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  res.status(201).json({
    status: "success",
    message: "password changed successfully",
  });
});

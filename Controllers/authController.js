const appError = require("../Utils/ErrorHandlers/appError");
const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const verificationCodeTemplate = require("../Utils/Email/MailTemplates/VerificationTemplate");
const sendToken = require("../Utils/sendToken");
const sendEmail = require("../Utils/Email/sendEmail");
const generateForgotPasswordEmailTemplate = require("../Utils/Email/MailTemplates/ForgotPassTemplate");

const secret = process.env.JWT_SECRET;

/*
req.user sirf ek request ke dauran hi valid hota hai.
Uske baad wo memory se hata diya jaata hai.
Next request pe middleware usko dobara set karega (cookie/token ke base par).
*/

exports.register = catchAsync(async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return next(new appError("email , password and name are required", 401));
  }

  const registeredUser = await User.findOne({ email, accountVerified: true });

  if (registeredUser) {
    return next(new appError("A user exists with this email", 401));
  }

  const allUsers = await User.find({
    email,
    accountVerified: false,
    createdAt: { $gt: Date.now() - 10 * 60 * 1000 },
  });

  if (allUsers.length >= 5) {
    return next(new appError("Too many attempts , wait for some time", 401));
  }

  const latestUser = await User.create({ email, password, name });

  console.log(latestUser);

  const latestEmail = latestUser.email;
  const otp = latestUser.generateVerificationCode();
  await latestUser.save();

  const message = verificationCodeTemplate(otp);

  return await sendEmail(
    res,
    latestEmail,
    "Verification Code(Andaman College)",
    message,
    `Verification Code sent to ${latestEmail}`
  );
});

exports.verifyCode = catchAsync(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return next(new appError("Provide email and otp for verification", 401));

  const allUsers = await User.find({ email });
  if (allUsers.length === 0) {
    return next(new appError("Invalid Applicant", 401));
  }

  const user = allUsers.sort((a, b) => b.createdAt - a.createdAt)[0];

  if (otp !== user.verificationCode) {
    return next(new appError("OTP does not match", 401));
  }

  if (user.verificationCodeExpires <= Date.now()) {
    return next(new appError("Time expired for this otp", 401));
  }

  await User.deleteMany({ email, createdAt: { $lt: user.createdAt } });

  user.verificationCode = null;
  user.accountVerified = true;
  user.verificationCodeExpires = null;

  await user.save();

  return sendToken(user, 200, "Account Verified", res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new appError("Provide email and password for login", 401));

  const user = await User.findOne({ email, accountVerified: true }).select(
    "+password"
  );
  if (!user) {
    return next(new appError("No such a user", 401));
  }

  const decode = await user.check(password);
  if (!decode) {
    return next(new appError("Password is incorrect", 401));
  }

  return sendToken(user, 201, "User Logged in succesfuly", res);
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
  const user = await User.findOne({ email, accountVerified: true });
  if (!user) {
    return next(new appError("There is no user with this email", 401));
  }

  const resetToken = user.getResetPasswordToken();
  console.log(resetToken);

  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/password/reset/${resetToken}`;

  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);

  //res, email, subject, message
  return await sendEmail(
    res,
    email,
    "Reset Password (Andaman College)",
    message,
    `Reset Password Url sent to ${email} `
  );
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { newPassword, confirmPassword } = req.body;
  if (newPassword.length < 8 || newPassword.length > 16) {
    return next(new appError("Password length must be between 8 and 16", 401));
  }

  if (newPassword !== confirmPassword) {
    return next(new appError("Both Passwords do not match", 401));
  }

  const token = req.params.token;
  const resetToken = await crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new appError("Invalid or expired token", 401));
  }
  if (user.resetPasswordTokenExpires <= Date.now()) {
    return next(new appError("Token has expired", 401));
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;

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

exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new appError("You can't perfom this action", 401));
    }
    next();
  };
};

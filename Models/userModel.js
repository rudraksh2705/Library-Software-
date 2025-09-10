const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      validate: [validator.isEmail, "It does not look like an email"],
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "librarian"],
    },

    accountVerified: {
      type: Boolean,
      default: false,
    },

    borrowedBooks: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Borrow",
        },
        returned: {
          type: Boolean,
          default: false,
        },
        bookTitle: String,
        borrowDates: Date,
        dueDate: Date,
      },
    ],

    avatar: {
      public_id: String,
      url: String,
    },

    verificationCode: {
      type: Number,
    },

    verificationCodeExpires: {
      type: Date,
    },

    resetPasswordToken: String,

    resetPasswordTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

function generateRandomNumber() {
  const firstDigit = Math.floor(Math.random() * 9 + 1);
  const remDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return parseInt(firstDigit + remDigits);
}

UserSchema.methods.generateVerificationCode = function () {
  const otp = generateRandomNumber();
  this.verificationCode = otp;
  this.verificationCodeExpires = Date.now() + 10 * 60 * 1000;
  return otp;
};

UserSchema.methods.getResetPasswordToken = function () {};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign({ id: this._id }, secret);
  return token;
};

UserSchema.methods.check = async function (userPassword) {
  console.log(userPassword);
  const decoded = await bcrypt.compare(userPassword, this.password);
  return decoded;
};

UserSchema.methods.getResetPasswordToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;
  return token;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

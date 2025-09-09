const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
  this.verificationCodeExpires = Date.now() + 5 * 60 * 1000;
  return otp;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;

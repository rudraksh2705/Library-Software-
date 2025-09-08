const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
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

    verificationCode: Number,

    verificationCodeExpires: Date,

    resetPasswordToken: String,

    resetPasswordTokenExpires: Date,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;

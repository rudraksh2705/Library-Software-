const mongoose = require("mongoose");

const BorrowSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    dueDate: {
      type: Date,
      default: new Date(Date.now() + 7 * 24 * 60 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

const Borrowed = mongoose.model("Borrowed", BorrowSchema);
module.exports = Borrowed;

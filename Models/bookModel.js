const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timeStamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

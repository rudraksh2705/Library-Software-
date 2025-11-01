const mongoose = require("mongoose");

const returnSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    returnDate: {
      type: Date,
      default: new Date(Date.now()),
    },
    fine: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Return = mongoose.model("Return", returnSchema);
module.exports = Return;

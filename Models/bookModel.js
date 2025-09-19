const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
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
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
        foreignField: "",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// bookSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "reviews",
//     select: "rating description user",
//   });
// });

const Books = mongoose.model("Book", bookSchema);
module.exports = Books;

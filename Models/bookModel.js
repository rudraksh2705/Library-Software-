const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
  },
  {
    timestamps: true,
  }
);

bookSchema.set("toObject", { virtuals: true });
bookSchema.set("toJSON", { virtuals: true });

bookSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "book",
  localField: "_id",
});

const Books = mongoose.model("Book", bookSchema);
module.exports = Books;

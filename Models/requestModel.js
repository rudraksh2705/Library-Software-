const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: "pending",
    },
    description: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
    },
    days: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RequestSchema.pre("save", function () {
  this.dueDate = new Date(Date.now() + this.days * 24 * 60 * 60 * 1000);
});

const Request = mongoose.model("Request", RequestSchema);
module.exports = Request;

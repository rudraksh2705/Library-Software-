const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const issueSchema = new mongoose.Schema(
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
    borrowingVerified: {
      type: Boolean,
      default: false,
    },
    borrowed: {
      type: Boolean,
      default: false,
    },
    issuingExpires: {
      type: Date,
      default: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Date,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

issueSchema.methods.generateOtp = function () {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp;
};

issueSchema.methods.verifyCode = async function (otp) {
  return await bcrypt.compare(String(otp), this.verificationCode);
};

const Issued = mongoose.model("Issued", issueSchema);
module.exports = Issued;

const express = require("express");
const BorrowController = require("../Controllers/BorrowController");
const authController = require("../Controllers/authController");

const Router = express.Router();
Router.route("/form").post(
  authController.isAuthenticated,
  BorrowController.requestOTP
);
Router.route("/verify").post(
  authController.isAuthenticated,
  BorrowController.verifyOtp
);
Router.route("/verifiedIssues/all").get(BorrowController.verifiedIssues);
Router.route("/verifiedIssue/:issueId").get(BorrowController.borrowFinally);

module.exports = Router;

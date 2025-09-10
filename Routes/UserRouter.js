const express = require("express");
const authController = require("../Controllers/authController");

const Router = express.Router();

Router.route("/register").post(authController.register);
Router.route("/verifyOTP").post(authController.verify);
Router.route("/login").post(authController.login);
Router.route("/logout").post(
  authController.isAuthenticated,
  authController.logout
);
Router.route("/me").get(authController.isAuthenticated, authController.getUser);
Router.route("/forgetPassword").post(authController.forgetPassword);
Router.route("/password/reset/:token").post(authController.resetPassword);
module.exports = Router;

const express = require("express");
const Router = express.Router();
const authController = require("../Controllers/authController");

Router.route("/register").post(authController.register);
Router.route("/verifyOtp").post(authController.verifyOtp);
Router.route("/login").post(authController.login);
Router.route("/logout").post(
  authController.isAuthenticated,
  authController.logout
);
Router.route("/me").get(authController.isAuthenticated, authController.getUser);
Router.route("/forgetpassword").post(authController.forgetPassword);
Router.route("/password/reset/:token").post(authController.resetPassword);
Router.route("/updatePassword").patch(
  authController.isAuthenticated,
  authController.updatePassword
);

module.exports = Router;

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

// Admin routes
Router.route("/admin/add-librarian").post(
  authController.isAuthenticated,
  authController.isAuthorized("admin"),
  authController.addLibrarian
);

Router.route("/admin/librarians").get(
  authController.isAuthenticated,
  authController.isAuthorized("admin"),
  authController.getAllLibrarians
);

Router.route("/admin/all-users").get(
  authController.isAuthenticated,
  authController.isAuthorized("admin"),
  authController.getAllUsers
);

module.exports = Router;

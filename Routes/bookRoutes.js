const express = require("express");
const bookController = require("../Controllers/bookController");
const {
  isAuthenticated,
  isAuthorized,
} = require("../Controllers/authController");

const Router = express.Router();

Router.route("/admin/add").post(
  isAuthenticated,
  //   isAuthorized("admin"),
  bookController.addBooks
);

Router.route("/all").get(isAuthenticated, bookController.getAllBooks);

Router.route("/delete/:id").delete(
  isAuthenticated,
  isAuthorized("admin"),
  bookController.deleteBook
);

module.exports = Router;

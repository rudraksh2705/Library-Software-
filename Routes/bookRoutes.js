const express = require("express");
const Router = express.Router();

const authController = require("../Controllers/authController");
const BookController = require("../Controllers/bookController");

Router.route("/all").get(BookController.getAllBooks);

Router.route("/:id").get(BookController.getBookById);

Router.route("/admin/add").post(
  authController.isAuthenticated,
  authController.isAuthorized("admin", "librarian"),
  BookController.addBook
);

Router.route("/admin/update/:id").patch(
  authController.isAuthenticated,
  authController.isAuthorized("admin", "librarian"),
  BookController.updateBook
);

Router.route("/admin/delete/:id").delete(
  authController.isAuthenticated,
  authController.isAuthorized("admin", "librarian"),
  BookController.deleteBook
);

module.exports = Router;

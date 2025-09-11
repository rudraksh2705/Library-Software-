const express = require("express");
const {
  isAuthenticated,
  isAuthorized,
} = require("../Controllers/authController");
const borrowController = require("../Controllers/borrowController");
const Router = express.Router();

Router.route("/borrowed-books-by-users").get(
  isAuthenticated,
  isAuthorized("Admin"),
  borrowController.getBorrowedBooksforAdmin
);

Router.route("/my-borrowed-books").get(
  isAuthenticated,
  borrowController.borrowedBooks
);

Router.route("/my-borrowed-books").get(
  isAuthenticated,
  borrowController.borrowedBooks
);

Router.route("/return-borrowed-book/:bookId").put(
  isAuthenticated,
  isAuthorized("Admin"),
  borrowController.returnBorrowedBook
);

module.exports = Router;

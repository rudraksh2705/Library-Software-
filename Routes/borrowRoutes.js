const express = require("express");
const BorrowController = require("..//Controllers/borrowController");
const authController = require("../Controllers/authController");

const Router = express.Router();

Router.route("/recordBorrow/:id").post(
  authController.isAuthenticated,
  //   authController.isAuthorized("admin"),
  BorrowController.recordBorrowedBook
);

Router.put(
  "/return-borrowed-book/:bookId",
  authController.isAuthenticated,
  authController.isAuthorized("admin")
);
/*
Router.route("/borrowed-books-by-users").get(
  authController.isAuthenticated,
  authController.isAuthorized("admin"),
  BorrowController
);

Router.route("/my-borrowed-books").get(
  authController.isAuthenticated,
  BorrowController
);


*/
module.exports = Router;

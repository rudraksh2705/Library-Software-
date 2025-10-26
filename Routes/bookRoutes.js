const express = require("express");
const Router = express.Router();

const authController = require("../Controllers/authController");
const BookController = require("../Controllers/bookController");

Router.route("/all").get(
  authController.isAuthenticated,
  BookController.getAllBooks
);

Router.route("/admin/add").post(
  authController.isAuthenticated /*,
  authController.isAuthorized("admin"),*/,
  BookController.addBook
);

Router.route("/delete/:id").delete(
  authController.isAuthenticated,
  /*
  authController.isAuthorized("admin")*/
  BookController.deleteBook
);

module.exports = Router;

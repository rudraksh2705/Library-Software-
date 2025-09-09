const express = require("express");
const authController = require("../Controllers/authController");

const Router = express.Router();

Router.route("/register").post(authController.register);

module.exports = Router;

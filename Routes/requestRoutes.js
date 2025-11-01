const express = require("express");
const requestController = require("../Controllers/requestController");
const authController = require("../Controllers/authController");

const Router = express.Router({ mergeParams: true });

Router.route("/createReq").post(
  authController.isAuthenticated,
  requestController.createRequest
);
Router.route("/:requestId/accept").post(requestController.acceptRequest);
Router.route("/:requestId/reject").post(requestController.rejectRequest);

Router.route("/all").get(
  authController.isAuthenticated,
  authController.isAuthorized("admin librarian"),
  requestController.viewAllRequest
);

Router.route("/delete/:requestId").delete(requestController.deleteRequest);

module.exports = Router;

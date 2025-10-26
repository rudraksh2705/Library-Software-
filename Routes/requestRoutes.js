const express = require("express");
const Router = express.Router();
const requestController = require("../Controllers/requestController");
const authController = require("../Controllers/authController");

// Create request (student only)
Router.post(
  "/create",
  authController.isAuthenticated,
  authController.isAuthorized("student"),
  requestController.createRequest
);

// Get all requests (librarian/admin only)
Router.get(
  "/all",
  authController.isAuthenticated,
  authController.isAuthorized("librarian", "admin"),
  requestController.getAllRequests
);

// Get my requests (student only)
Router.get(
  "/my-requests",
  authController.isAuthenticated,
  authController.isAuthorized("student"),
  requestController.getMyRequests
);

// Approve request (librarian/admin only)
Router.patch(
  "/approve/:requestId",
  authController.isAuthenticated,
  authController.isAuthorized("librarian", "admin"),
  requestController.approveRequest
);

// Reject request (librarian/admin only)
Router.patch(
  "/reject/:requestId",
  authController.isAuthenticated,
  authController.isAuthorized("librarian", "admin"),
  requestController.rejectRequest
);

// Cancel request (student only)
Router.delete(
  "/cancel/:requestId",
  authController.isAuthenticated,
  authController.isAuthorized("student"),
  requestController.cancelRequest
);

module.exports = Router;

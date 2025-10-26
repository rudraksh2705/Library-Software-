const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Handle specific errors
  if (err.name === "CastError") {
    err.message = `Invalid ${err.path}: ${err.value}`;
    err.statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    err.message = "Invalid token. Please log in again.";
    err.statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    err.message = "Your token has expired. Please log in again.";
    err.statusCode = 401;
  }

  // Send final response
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;

const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const userRoutes = require("./Routes/userRoutes");
const bookRoutes = require("./Routes/bookRoutes");
const borrowRoutes = require("./Routes/borrowRoutes");
const requestRoutes = require("./Routes/requestRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  })
);

// Add test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!", status: "success" });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/borrow", borrowRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/reviews", reviewRoutes);

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
  console.log("error");
  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
  });
});

module.exports = app;

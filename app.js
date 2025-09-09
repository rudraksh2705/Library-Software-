const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const cookieParser = require("cookie-parser");
const cors = require("cors");
const appError = require("./Utils/ErrorHandlers/appError");
const userRouter = require("./Routes/UserRouter");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`/api/v1/users`, userRouter);

app.use((err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.code === 11000) {
    console.log(err);
    const statusCode = 400;
    const message = "Duplicate Field Value Entered";
    err = new appError(message, statusCode);
  }

  if (err.name === "JsonWebTokenError") {
    const statusCode = 400;
    const message = "Invalid JSON web token";
    err = new appError(message, statusCode);
  }

  if (err.name === "TokenExpiredError") {
    const statusCode = 400;
    const message = "Expired JSON web token";
    err = new appError(message, statusCode);
  }

  if (err.name === "CastError") {
    const statusCode = 400;
    const message = `Resource Not Found. Invalid Path : ${err.path}`;
    err = new appError(message, statusCode);
  } else {
    const statusCode = err.statusCode || 401;
    const message = err.message || "Something went wrong !!";
    err = new appError(message, statusCode);
  }

  const errorMessage = err.errors
    ? Object.values(err.errors)
        .map((error) => error.message)
        .join(" ")
    : err.message;

  res.status(err.statusCode).json({
    status: "Failed",
    message: errorMessage,
  });
});

module.exports = app;

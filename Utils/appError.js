class appError extends Error {
  constructor(message, statusCode) {
    super(message); // sets message property
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error"; // "fail" for 4xx, "error" for 5xx
    this.isOperational = true; // marks this as an operational error (trusted)

    Error.captureStackTrace(this, this.constructor); // removes constructor from stack trace
  }
}

module.exports = appError;

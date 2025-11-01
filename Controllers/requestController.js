const catchAsync = require("../Utils/ErrorHandlers/catchAsync");
const appError = require("../Utils/ErrorHandlers/appError");
const Request = require("../Models/requestModel");
const Issued = require("../Models/issuedModel");

exports.createRequest = catchAsync(async (req, res, next) => {
  const user_id = req.user.id;
  const { description, days } = req.body;
  let book;
  if (req.body.book) {
    book = req.body.book;
  } else book = req.params.bookId;

  const request = await Request.create({
    user: user_id,
    book,
    description,
    days,
  });
  res.status(201).json({
    status: "success",
    data: request,
  });
});

exports.acceptRequest = catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;
  const request = await Request.findOne({
    _id: requestId,
    status: "pending",
  }).populate({ path: "book", select: "title" });
  request.status = "accepted";
  await request.save();
  await Issued.create({
    book: request.book,
    user: request.user,
    dueDate: request.dueDate,
  });
  res.status(201).json({
    status: "success",
    message: `Your request for Book : ${request.book.title} has been accepted .`,
  });
});

exports.rejectRequest = catchAsync(async (req, res, next) => {
  const requestId = req.params.requestId;
  const request = await Request.find({
    _id: requestId,
    status: "pending",
  }).populate([
    {
      path: "book",
      select: "title",
    },
  ]);
  request.status = "rejected";
  await request.save();
  res.status(201).json({
    status: "success",
    message:
      "Your request has been rejected due to unavialbilty of books . You can try for some other book...",
  });
});

exports.viewAllRequest = catchAsync(async (req, res, next) => {
  const requests = await Request.find({ status: "pending" }).populate([
    { path: "user", select: "name email" },
    { path: "book", select: "title" },
  ]);

  const length = requests.length;

  res.status(200).json({
    status: "success",
    size: requests.length,
    message:
      length === 0
        ? "No pending requests right now..."
        : "These are pending requests which are not fulfilled",
    data: requests,
  });
});

exports.deleteRequest = catchAsync(async (req, res, next) => {
  const deleted = await Request.deleteOne({ _id: req.params.requestId });
  if (!deleted) {
    return next(new appError("Request not found to  delete", 400));
  }
  res.status(204).json({});
});

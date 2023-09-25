const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getMe = (req, res, next) => {
  // console.log(req.user);
  req.params.id = req.user.id;
  next();
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate({
    path: "products",
  });
  if (!user) return next(new AppError("You are not authorized!"));

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
    .populate("products")
    .select("name phoneNumber email products photo");

  res.status(200).json({ status: "success", data: { users } });
});

const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fs = require("fs");

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

exports.changeUsersData = async (req, res, next) => {
  const user = req.user;
  // console.log(user.id);
  const currentUser = await User.findById(user.id);
  // console.log("☘️", currentUser);
  if (req.file) {
    fs.unlink(`${__dirname}/../images/users/${user.photo}`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log("File deleted successfully");
      }
    });

    currentUser.photo = req.file.filename;
    console.log(currentUser.photo);
    console.log("------------------------");
    console.log(req.file.filename);
  }

  currentUser.save();
  res.status(200).json({ status: "success" });
};

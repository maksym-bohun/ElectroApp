const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const sendEmail = require("./../utils/email");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({ status: "success", token, data: { user } });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt || undefined,
    phoneNumber: req.body.phoneNumber,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;
  let currentUser = undefined;
  if (!password && (!phoneNumber || !email))
    return next(
      new AppError(
        "Please provide your phone number or email and password!",
        400
      )
    );
  if (email === undefined && phoneNumber !== undefined) {
    currentUser = await User.findOne({ phoneNumber }).select("+password");
    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      return next(new AppError("Incorrect phone number or password!", 400));
    }
  } else if (phoneNumber === undefined && email !== undefined) {
    currentUser = await User.findOne({ email }).select("+password");
    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      return next(new AppError("Incorrect email or password!", 400));
    }
  } else {
    currentUser = await User.findOne({ email }).select("+password");
    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      return next(new AppError("Incorrect email or password!", 400));
    }
  }

  createSendToken(currentUser, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user beloning to this token does not longer exists! Please sign up again!",
        401
      )
    );
  }

  console.log(decoded);

  // 4 Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    next(
      new AppError(
        "User recently changed the password. Please log in again!",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User with this email is not registered!"));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  try {
    await sendEmail({ email: user.email, user, resetURL });
    res
      .status(200)
      .json({ status: "success", message: "Token was sent to email." });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        "There was an error sending the email, try again later!",
        500
      )
    );
  }
});

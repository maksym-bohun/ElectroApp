const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minlength: 1,
  },
  products: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number!"],
    unique: true,
    length: 9,
  },
  email: {
    type: String,
    required: [true, "Please enter your email!"],
    unique: true,
  },
  photo: { type: String },
  password: {
    type: String,
    required: [true, "Please enter password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    // required: [true, "Please confirm your password!"],
    // minlength: 8,
    // select: false,
    // validate: {
    //   validator: function (el) {
    //     return el === this.password;
    //   },
    //   message: "Passwords are not the same!",
    // },
  },
  passwordChangedAt: { type: Date, default: Date.now() },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
  likedProducts: { type: [mongoose.ObjectId], ref: "Product" },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(this.passwordChangedAt.getTime() / 1000);
    return JWTTimeStamp < changedTimeStamp;
  }
  return false;
};
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ products: 1 });

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;

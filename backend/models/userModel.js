const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name!"],
    minlength: 1,
  },

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
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    minlength: 8,
    select: false,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  passwordChangedAt: { type: Date, default: Date.now() },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

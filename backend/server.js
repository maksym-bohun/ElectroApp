const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const app = require("./app");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => console.log("DB connection successfull!"))
  .catch((err) => console.log("ERROR"));

const port = 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

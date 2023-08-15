const express = require("express");
const hpp = require("hpp");
const productsRouter = require("./routes/productsRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");

const app = express();
var bodyParser = require("body-parser");

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  hpp({
    whitelist: ["price", "ratingsAverage"],
  })
);

app.use("/api/v1/products", jsonParser, productsRouter);
app.use("/api/v1/categories", jsonParser, categoriesRouter);
module.exports = app;

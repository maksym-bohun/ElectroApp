const express = require("express");
const hpp = require("hpp");
const productsRouter = require("./routes/productsRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const usersRouter = require("./routes/usersRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();
var bodyParser = require("body-parser");
const AppError = require("./utils/appError");

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(
  hpp({
    whitelist: ["price", "ratingsAverage"],
  })
);

app.use("/api/v1/products", jsonParser, productsRouter);
app.use("/api/v1/categories", jsonParser, categoriesRouter);
app.use("/api/v1/users", jsonParser, usersRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

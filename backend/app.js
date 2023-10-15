const express = require("express");
const hpp = require("hpp");
const productsRouter = require("./routes/productsRoutes");
const categoriesRouter = require("./routes/categoriesRoutes");
const usersRouter = require("./routes/usersRoutes");
const chatsRouter = require("./routes/chatsRoutes");
const globalErrorHandler = require("./controllers/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var bodyParser = require("body-parser");
const AppError = require("./utils/appError");

const app = express();

var jsonParser = bodyParser.json();

app.set("view engine", "ejs");

const allowedOrigins = ["www.example1.com", "www.example2.com"];

app.use(bodyParser.json({ limit: "20mb" }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Разрешаем доступ с указанного домена
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Разрешаем передачу учетных данных
  next();
});

app.use(
  hpp({
    whitelist: ["price", "ratingsAverage"],
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/products", jsonParser, productsRouter);
app.use("/api/v1/categories", jsonParser, categoriesRouter);
app.use("/api/v1/users", jsonParser, usersRouter);
app.use("/api/v1/chats", jsonParser, chatsRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

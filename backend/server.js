const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const { Server } = require("socket.io");
const messagesController = require("./controllers/messagesController");

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

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
  .then((con) => console.log("DB connection successful!"))
  .catch((err) => console.log("ERROR"));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`✅User connected:  ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID ${socket.id} joind room ${data}`);
  });

  socket.on("send_message", (data) => {
    console.log("DATA 1: ", data);
    socket.to(data.chat_id).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 3001;
const mongoDB =
  process.env.NODE_ENV !== "test"
    ? process.env.MONGODB
    : process.env.MONGODBTEST;

require("./src/todo/todoModel");
const todoRoutes = require("./src/todo/todoRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}

app.use("/todos", todoRoutes);

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.connection.on("error", err => {
  console.log(err.message);
});

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = server;

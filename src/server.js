const express = require("express");
const morgan = require("morgan");
require("dotenv").config(); // read environment variable from .env file
const cors = require("cors");
// const { redisInit } = require("./service/redis");
const router = require("./routes/routerV1");
const path = require("path");
// const loggingMiddleware = require("./middleware/logging");

// create instance of express
const app = express();

// connect to redis server
redisInit();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// cors configuration
app.use(
  cors({
    origin: "*",
  })
);

// app.use(loggingMiddleware);

// incoming request parser
app.use(express.json());

// create router group
app.use("/api/v1/", router);

// serving static files
app.use("/static", express.static(path.join(__dirname, "../uploads")));

// get port from environment variable, if not exist then use default port 5000
const port = process.env.PORT || 5000;

// run server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

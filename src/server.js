const express = require("express");
const morgan = require("morgan");
require("dotenv").config(); // read environment variable from .env file
const cors = require("cors");
// const { redisInit } = require("./service/redis");
const mstRoleRouter = require("./routes/mstRoleRouter");
const path = require("path");
const customLogger = require("./middlewares/logger");

// create instance of express
const app = express();

// cors configuration
app.use(
  cors({
    origin: "*",
    methods: ["HEAD", "OPTIONS", "GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);

// connect to redis server
// redisInit();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// custom logger middleware
app.use(customLogger);

// app.use(loggingMiddleware);

// incoming request parser
app.use(express.json());

// create router group
app.use("/api/v1/", mstRoleRouter);

// serving static files
app.use("/static", express.static(path.join(__dirname, "../uploads")));

// get port from environment variable, if not exist then use default port 5000
const port = process.env.PORT || 5000;

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

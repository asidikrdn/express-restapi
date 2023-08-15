const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../docs/swagger");
const morgan = require("morgan");
require("dotenv").config(); // read environment variable from .env file
const cors = require("cors");
const { redisInit } = require("../config/redis");
const path = require("path");
const customLogger = require("./pkg/middlewares/logger");
const router = require("./routes");

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

// setup swagger jsdoc
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Express REST API",
//       version: "1.0.0",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000/api/v1",
//       },
//     ],
//   },
//   apis: ["src/routes/*.js"], // Path to the API routes files
// };
// const specs = swaggerJsDoc(options);

// run swagger with swagger-jsdoc
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );

// run swagger with json
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// connect to redis server
// redisInit();

// create logger instance
const logger = morgan("dev");
app.use(logger);

// custom logger middleware
app.use(customLogger);

// incoming request parser
app.use(express.json());

// create router group
app.use("/api/v1/", router);

// serving static files
app.use("/static", express.static(path.join(__dirname, "../uploads")));

// get port from environment variable, if not exist then use default port 5000
const port = process.env.PORT || 5000;

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

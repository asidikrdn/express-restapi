import express from "express";
import morgan from "morgan";
import cors from "cors";
import {
  NODE_ENV,
  CORS_ORIGIN,
  PORT,
  CORS_HEADER,
  CORS_METHOD,
} from "./utils/env.util.js";

// create instance of express
const app = express();

// cors configuration
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(",") : "*",
    methods: CORS_METHOD ? CORS_METHOD.split(",") : "*",
    allowedHeaders: CORS_HEADER ? CORS_HEADER.split(",") : "*",
  })
);

// create logger instance
const morganFormat = NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(morganFormat));

// incoming request parser
app.use(express.json());

// get port from environment variable, if not exist then use default port 5000
const port = PORT;

// run server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

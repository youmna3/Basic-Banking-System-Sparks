import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
// import morgan from "morgan";
//import Logging from "./library/Logging";
import chalk from "chalk";
import Logging from "./library/Logging";

const app = express();

// connect to mongo
mongoose
  .connect(config.mongo.url)
  .then(() => {
    Logging.info("connected to db");
  })
  .catch((error) => {
    Logging.error(error);
  });
//app.use(morgan("dev"));
// if (process.env.NODE_ENV == "development") {
//   app.use(morgan("dev"));
//   console.log(`mode ${process.env.NODE_ENV}`);
// }
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

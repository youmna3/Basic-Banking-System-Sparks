import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";

const app = express();
// connect to mongo
mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connected to db");
  })
  .catch((error) => {
    console.log(error);
  });

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
// import morgan from "morgan";
const Logging_1 = __importDefault(require("./library/Logging"));
const app = (0, express_1.default)();
// connect to mongo
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    Logging_1.default.info("connected to db");
})
    .catch((error) => {
    console.log(error);
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

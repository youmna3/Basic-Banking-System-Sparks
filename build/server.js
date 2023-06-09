"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const customer_1 = __importDefault(require("./routes/customer"));
const Transfer_1 = __importDefault(require("./routes/Transfer"));
const app = (0, express_1.default)();
// connect to mongo
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then((conn) => {
    Logging_1.default.info(`Database is connected on:${conn.connection.host}`);
    startServer();
})
    .catch((error) => {
    Logging_1.default.error(error);
});
// start thesever if mongo is connected
const startServer = () => {
    // logging req
    app.use((req, res, next) => {
        Logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    /** Rules of our API */
    /*
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
  
      if (req.method == "OPTIONS") {
        res.header(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(200).json({});
      }
  
      next();
    });
    */
    // Routes
    //app.use("/");
    app.use('/api/customers', customer_1.default);
    app.use('/api/transfer', Transfer_1.default);
    const port = process.env.PORT || 8000;
    app.get('/', (req, res) => {
        res.send('Home');
        Logging_1.default.info(res.statusCode);
    });
    // Error Handling
    app.use((req, res, next) => {
        const error = new Error('not found');
        Logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    //http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
    app.listen(port, () => {
        Logging_1.default.info(`Server is running on http://localhost:${port}`);
    });
};

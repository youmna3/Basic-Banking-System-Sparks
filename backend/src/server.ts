import express, { Request, Response } from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import customerRoute from './routes/customer';
import transferRoute from './routes/Transfer';
const app = express();

// connect to mongo
mongoose
  .connect(config.mongo.url)
  .then((conn) => {
    Logging.info(`Database is connected on:${conn.connection.host}`);
    startServer();
  })
  .catch((error) => {
    Logging.error(error);
  });

// start thesever if mongo is connected
const startServer = () => {
  // logging req
  app.use((req, res, next) => {
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );
    res.on('finish', () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
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
  app.use('/api/customers', customerRoute);
  app.use('/api/transfer', transferRoute);
  const port = process.env.PORT || 8000;

  app.get('/', (req, res) => {
    res.send('Home');
    Logging.info(res.statusCode);
  });
  // Error Handling
  app.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);
    return res.status(404).json({ message: error.message });
  });
  //http.createServer(app).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));

  app.listen(port, () => {
    Logging.info(`Server is running on http://localhost:${port}`);
  });
};

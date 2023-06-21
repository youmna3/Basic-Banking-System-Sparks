import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logging from './library/Logging';
import customerRoute from './routes/customer';
import transferRoute from './routes/Transfer';
import path from 'path';

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

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if (req.method == 'OPTIONS') {
      res.header(
        'Access-Control-Allow-Methods',
        'PUT, POST, PATCH, DELETE, GET'
      );
      return res.status(200).json({});
    }

    next();
  });

  app.use('/api/customers', customerRoute);
  app.use('/api/transfer', transferRoute);

  // middleware serves static files from the dist folder
  app.use(express.static(__dirname + '/dist/basic-banking-system'));

  // catch-all route to serve the Angular app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/basic-banking-system/index.html'));
  });

  // Error Handling
  app.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error);
    return res.status(400).json({ message: error.message });
  });

  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    Logging.info(`Server is running on http://localhost:${port}`);
  });
};

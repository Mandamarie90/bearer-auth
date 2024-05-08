'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const handleNotFound = require('./error-handlers/404.js');
const handleErrors = require('./error-handlers/500.js');
const authRouter = require('./auth/router/index.js');  // Ensure this file is set up correctly.

// Prepare the express app
const app = express();

// App Level Middleware
app.use(cors());  // Handles cross-origin requests
app.use(morgan('dev'));  // Logs requests to the server, useful for debugging
app.use(express.json());  // Parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));  // Parses incoming requests with URL-encoded payloads

// Routes
app.use(authRouter);  // This is crucial for your authentication routes

// Catchalls
app.use(handleNotFound);  // Handles requests to undefined routes
app.use(handleErrors);  // Handles any errors that occur during request processing

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};

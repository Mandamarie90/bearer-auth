'use strict';

require('dotenv').config(); // Corrected syntax


const { start } = require('./src/server.js');
const { db } = require('./src/auth/models/index.js');

// Start up DB Server
db.sync()
  .then(() => {
    start(process.env.PORT);
  });

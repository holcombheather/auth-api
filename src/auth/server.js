'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');


// Esoteric Resources
const errorHandler = require('../error-handlers/500.js');
const notFoundHandler = require('../error-handlers/404.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
const authRoutes = require('./auth/routes.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);


// module.exports = {
//   server: app,
//   start: (port) => {
//     app.listen(port, () => {
//       console.log(`Server Up on ${port}`);
//     });
//   },
// };

/// auth server.js


module.exports = {
  server: app,
  start: port => {
    if (!port) { throw new Error('Missing Port'); }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};

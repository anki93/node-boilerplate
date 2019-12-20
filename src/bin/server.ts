import dotenv from "dotenv";
dotenv.config();

import http from 'http';
import app from "../app";
//var debug = require('debug')('boilerplate:server');
//console.log(require('os').cpus().length)

/**
 * Get port from environment and store in Express.
 */

let port = process.env.PORT || "3000";
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: NodeJS.ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : addr === null 
      ? '' 
      : `port ${addr.port}`;
  console.info(`server started on ${bind}`)
}


#!/usr/bin/env node
/* global log config b:true */

import app from '../app';
import http from 'http';


/**
 * Get port from environment and store in Express.
 */

const port = 7777;
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

const onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = (typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`);

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            log.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            log.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

const onListening = () => {
    const addr = server.address();
    const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
    log.debug(`Node Express Server listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

export default server;

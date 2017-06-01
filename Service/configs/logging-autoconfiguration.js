/* global config b:true */

import os from 'os';
import bunyan from 'bunyan';

const logLevel = process.env.NODE_ENV === 'server' ? 'info' : 'debug';
global.log = bunyan.createLogger({
    name: 'Node Express',
    app: 'Node Express App',
    hostname: os.hostname(),
    serializers: bunyan.stdSerializers,
    streams: [
        {
            level: logLevel,
            stream: process.stdout
        }
    ]
});

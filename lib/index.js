'use strict';

var Bunyan = require('bunyan');

exports.generate = function (options) {
    var logger,
        result = {},
        expose = ['info', 'warn', 'error', 'fatal', 'debug', 'trace', 'child'],
        i = 0,
        il = expose.length;

    options = options || {};

    logger = Bunyan.createLogger({
        name: 'governor-agent',
        streams: [{
            stream: process.stdout,
            level: options.level ? options.level : Bunyan.INFO
        }]
    });

    for (; i < il; i++) {
        result[expose[i]] = logger[expose[i]].bind(logger);
    }

    return result;
};

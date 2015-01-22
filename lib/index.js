'use strict';

var Bunyan = require('bunyan');

exports.generate = function (options) {
    var logger,
        result = {};

    logger = Bunyan.createLogger({
        name: 'governor-agent',
        streams: [{
            stream: process.stdout,
            level: options.level ? options.level : Bunyan.INFO
        }]
    });

    result.info = logger.info;
    result.warn = logger.warn;
    result.error = logger.error;
    result.fatal = logger.fatal;
    result.debug = logger.debug;
    result.trace = logger.trace;
    result.child = logger.child;

    return result;
};
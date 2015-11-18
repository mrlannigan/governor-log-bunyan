'use strict';

var Bunyan = require('bunyan');

/**
 * Factory method for governor-agent to generate a logger
 * @param  {Object} options
 * @param  {Object} [options.serializers]
 * @param  {Object} [options.streams]
 * @param  {String} [options.level]
 * @return {Object}
 */
exports.generate = function (options) {
    var logger,
        result = {},
        expose = ['info', 'warn', 'error', 'fatal', 'debug', 'trace', 'child'],
        i = 0,
        il = expose.length,
        incomingStreams;

    options = options || {};

    if (options.hasOwnProperty('streams') && Array.isArray(options.streams) && options.streams.length > 0) {
        incomingStreams = options.streams;
    } else {
        incomingStreams = [{
            stream: process.stdout,
            level: options.level ? options.level : Bunyan.INFO
        }];
    }

    logger = Bunyan.createLogger({
        name: 'governor-agent',
        streams: incomingStreams,
        serializers: options.serializers || Bunyan.stdSerializers
    });

    for (; i < il; i++) {
        result[expose[i]] = logger[expose[i]].bind(logger);
    }

    return result;
};

exports.TRACE = Bunyan.TRACE;
exports.DEBUG = Bunyan.DEBUG;
exports.INFO = Bunyan.INFO;
exports.WARN = Bunyan.WARN;
exports.ERROR = Bunyan.ERROR;
exports.FATAL = Bunyan.FATAL;

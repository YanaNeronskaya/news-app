const winston = require('winston');

class Logger {
    constructor() {
        this._logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            transports: [
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
                new winston.transports.File({ filename: 'combined.log' })
            ]
        });
    }

    logInfo(method, url) {
        this._logger.info(`${new Date()}: ${method} ${url}`);
    }

    logError(message) {
        this._logger.error(message);
    }
}

module.exports = Logger;
const logger = require('../utils/logger');

function requestLogger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('request', {
      method: req.method,
      route: req.originalUrl,
      status: res.statusCode,
      ms: Date.now() - start,
    });
  });
  next();
}

module.exports = requestLogger;

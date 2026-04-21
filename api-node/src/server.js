require('dotenv').config();
const app = require('./app');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info('server_start', { port: PORT, env: process.env.NODE_ENV || 'development' });
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('express-async-errors');

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');
const requestLogger = require('./middlewares/requestLogger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

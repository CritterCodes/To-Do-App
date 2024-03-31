/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorHandler.js';
import colorCheckerMiddleware from './middleware/colorChecker.js';
import toDoRouter from './routes/to-do.routes.js';
import { db } from './lib/database.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(json());

app.post('/todo/api/v1/list/:toDoList/task', colorCheckerMiddleware());
app.patch('/todo/api/v1/list/:toDoList/task/:taskID', colorCheckerMiddleware());
app.patch('/todo/api/v1/list/:toDoList/task/:taskID/properties', colorCheckerMiddleware());

app.use('/todo/api/v1', toDoRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

// TODO: Environment based configs
const config = {
  url: 'mongodb://localhost:27017/',
  database: 'ARCA',
  minPoolSize: 3,
  maxPoolSize: 10,
};

db.init(config);

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});

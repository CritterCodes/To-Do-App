/* eslint-disable import/extensions */
import express from 'express';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorHandler.js';
import colorCheckerMiddleware from './middleware/colorChecker.js';
import toDoRouter from './routes/to-do.routes.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(json());

app.post('/todo/api/v1/:toDoList', colorCheckerMiddleware());
app.patch('/todo/api/v1/task/:toDoList:taskID', colorCheckerMiddleware());
app.patch('/todo/api/v1/task-properties/:toDoList/:taskID', colorCheckerMiddleware());

app.use('/todo/api/v1', toDoRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});

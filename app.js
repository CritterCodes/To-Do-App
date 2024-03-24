import express from 'express';
import bodyParser from 'body-parser';
import errorMiddleware from './middleware/errorHandler.js';
import newListHandlerMiddleware from './middleware/newListHandler.js';
import toDoRouter from './routes/to-do.routes.js';

const { json } = bodyParser;

// This is my express application
const app = express();
const port = 3000;
app.use(json());


app.get('/', (req, res) => {
  res.send('Hello There!')
});

app.post('/api/v1/toDo', newListHandlerMiddleware());
app.delete('/api/v1/toDo', toDoRouter);
app.get('/api/v1/toDo', toDoRouter);

app.use('/api/v1/toDo', toDoRouter);

// Error middleware MUST be last
app.use(errorMiddleware());

app.listen(port, () => {
  console.log(`Starting express application on port ${port} @ ${new Date().toISOString()}`);
});

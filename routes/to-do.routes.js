import express from 'express';
import {
    addTask,
    taskDeletion,
    showList
} from '../controllers/to-do.controller.js';

const toDoRouter = express.Router();

// POST /api/v1/toDo/<toDoList>/addTask
toDoRouter.post('/add/:toDoList/:addTask', addTask);

// DELETE /api/v1/toDo/<id>
toDoRouter.delete('/delete/:toDoList/:deleteTask', taskDeletion);

// GET /api/v1/toDo/<toDoList>
toDoRouter.get('/showList/:toDoList', showList);

export default toDoRouter;

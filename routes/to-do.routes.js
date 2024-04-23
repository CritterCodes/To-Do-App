/* eslint-disable import/extensions */
import express from 'express';
import {
    showList,
    showTask,
    addTask,
    replaceTask,
    updateTask,
    taskDeletion,
} from '../controllers/to-do.controller.js';

const toDoRouter = express.Router();

//  Get a list of todo items
toDoRouter.get('/list/:toDoList', showList);

//  Get a single todo item by ID
toDoRouter.get('/list/:toDoList/task/:taskID', showTask);

//  Create a new todo
toDoRouter.post('/list/:toDoList/task', addTask);

//  Update an existing todo item (full replace)
toDoRouter.put('/list/:toDoList/task/:taskID', replaceTask);

//  Partially update an existing todo item (patch)
toDoRouter.patch('/list/:toDoList/task/:taskID/properties', updateTask);

//  Delete a todo item
toDoRouter.delete('/list/:toDoList/task/:taskID', taskDeletion);

export default toDoRouter;

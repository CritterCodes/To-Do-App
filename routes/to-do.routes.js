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
toDoRouter.get('/lists/:toDoList', showList);

//  Get a single todo item by ID
toDoRouter.get('/lists/:toDoList/task/:taskID', showTask);

//  Create a new todo
toDoRouter.post('/lists/:toDoList/tasks', addTask);

//  Update an existing todo item (full replace)
toDoRouter.put('/lists/:toDoList/tasks/:taskID', replaceTask);

//  Partially update an existing todo item (patch)
toDoRouter.patch('/lists/:toDoList/tasks/:taskID/properties', updateTask);

//  Delete a todo item
toDoRouter.delete('/lists/:toDoList/tasks/:taskID', taskDeletion);

export default toDoRouter;

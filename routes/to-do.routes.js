import express from 'express';
import {
    showList,
    showTask,
    addTask,
    replaceTask,
    updateTask,
    taskDeletion
} from '../controllers/to-do.controller.js';

const toDoRouter = express.Router();

//  Get a list of todo items
toDoRouter.get('/showList/:toDoList', showList);

//  Get a single todo item by ID
toDoRouter.get('/showTask/:toDoList/:taskID', showTask);

//  Create a new todo
toDoRouter.post('/addTask/:toDoList', addTask);

//  Update an existing todo item (full replace)
toDoRouter.patch('/replace/:toDoList/:taskID', replaceTask)

//  Partially update an existing todo item (patch)
toDoRouter.patch('/update/:toDoList/:taskID/', updateTask)

//  Delete a todo item
toDoRouter.delete('/delete/:toDoList/:taskID', taskDeletion);

export default toDoRouter;

import { v4 as uuid } from 'uuid';
import ToDoModel from '../models/to-do.model.js';
import fsp from 'fs/promises';

export default class toDoCoordinator {
  //  Get a list of todo items
  static showList = async (filename) => {
  return await ToDoModel.showList(filename);
  };

  //  Get a single todo item by ID
  static showTask = async (filename, id) => {
  return await ToDoModel.showTask(filename, id);
  };
  
  //  Create a new todo
  static addTask = async (toDoList, task) => {
    const shortTask = task.task.substr(0, 4);
    const taskEntry = {
      id: `TASK-${shortTask}-${uuid().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "incomplete",
      color: `${task.color} - ${task.hexColor}`,
      task: task.task
  };
  return await ToDoModel.addTask(toDoList, taskEntry);
  };

  //  Update an existing todo item (full replace)
  static replaceTask = async (toDoList, taskID, update) => {
    const taskEntry = {
      id: `${taskID}`,
      updatedAt: new Date().toISOString(),
      status: update.status,
      color: update.color,
      task: update.task
  };
  return await ToDoModel.replaceTask(toDoList, taskID, taskEntry);
  };

  //  Partially update an existing todo item (patch)
  static updateTask = async (toDoList, taskID, update) => {
    const taskEntry = {
      id: `${taskID}`,
      updatedAt: new Date().toISOString(),
      status: update.status,
      color: update.color,
      task: update.task
  };
  return await ToDoModel.updateTask(toDoList, taskEntry);
  };

  //  Delete a todo item
  static deleteTask = async (filename, id) => {
    console.log('\t Coordinator : deleteTask()');
    return await ToDoModel.deleteTask(filename, id);
  };
}

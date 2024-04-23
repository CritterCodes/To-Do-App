/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import ToDoModel from '../models/to-do.model.js';
import Task from '../classes/task.js';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import taskSchema from '../schemas/task.json' assert { type: 'json' };

const ajv = new Ajv();
addFormats(ajv);
const taskValidate = ajv.compile(taskSchema);

export default class toDoCoordinator {
  //  Get a list of todo items
  static showList = async (filename) => await ToDoModel.showList(filename);

  //  Get a single todo item by ID
  static showTask = async (filename, id) => await ToDoModel.showTask(filename, id);

  //  Create a new todo
  static addTask = async (toDoList, task) => {
    const shortTask = task.task.split(' ').join('').substr(0, 4);
    const newTask = new Task();
    newTask.taskID = `TASK-${shortTask}-${uuid().slice(-4)}`;
    newTask.createdAt = new Date().toISOString();
    newTask.status = 'incomplete';
    newTask.color = `${task.color} - ${task.hexColor}`;
    newTask.task = task.task;

    const valid = taskValidatealidate(newTask);
    if (!valid) {
      throw validate.errors;
    }

    return await ToDoModel.addTask(toDoList, newTask);
  };

  //  Update an existing todo item (full replace)
  static replaceTask = async (toDoList, taskID, update) => {
    const updatedTask = new Task();
    updatedTask.taskID = taskID;
    updatedTask.createdAt = { updatedAt: new Date().toISOString() };
    Object.keys(update).forEach((key) => {
      switch (key) {
        case 'status':
          updatedTask.status = update.status;
          break;
        case 'color':
          updatedTask.color = update.color;
          break;
        case 'task':
          updatedTask.task = update.task;
          break;
        default:
          break;
      }
    });

    const valid = taskValidate(updatedTask);
    if (!valid) {
      throw validate.errors;
    }

    return await ToDoModel.updateTask(toDoList, taskID, update, updatedTask);
  };

  //  Partially update an existing todo item (patch)
  static updateTask = async (toDoList, taskID, update) => {
    const updatedTask = new Task();
    updatedTask.taskID = taskID;
    updatedTask.createdAt = { updatedAt: new Date().toISOString() };
    Object.keys(update).forEach((key) => {
      switch (key) {
        case 'status':
          updatedTask.status = update.status;
          break;
        case 'color':
          updatedTask.color = update.color;
          break;
        case 'task':
          updatedTask.task = update.task;
          break;
        default:
          break;
      }
    });

    const valid = taskValidate(updatedTask);
    if (!valid) {
      throw validate.errors;
    }

    return await ToDoModel.updateTask(toDoList, taskID, update, updatedTask);
  };

  //  Delete a todo item
  static deleteTask = async (filename, taskID) => {
    console.log(`\t Coordinator : deleteTask(${filename}, ${taskID})`);
    return await ToDoModel.deleteTask(filename, taskID);
  };
}

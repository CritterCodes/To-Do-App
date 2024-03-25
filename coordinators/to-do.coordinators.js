/* eslint-disable import/extensions */
import { v4 as uuid } from 'uuid';
import ToDoModel from '../models/to-do.model.js';
import { Task } from '../classes/classes.js';

export default class toDoCoordinator {
  //  Get a list of todo items
  static showList = async (filename) => await ToDoModel.showList(filename);

  //  Get a single todo item by ID
  static showTask = async (filename, id) => await ToDoModel.showTask(filename, id);

  //  Create a new todo
  static addTask = async (toDoList, task) => {
    const shortTask = task.task.substr(0, 4);
    const newTask = new Task();
    newTask.taskID = `TASK-${shortTask}-${uuid().slice(-4)}`;
    newTask.createdAt = new Date().toISOString();
    newTask.status = 'incomplete';
    newTask.color = `${task.color} - ${task.hexColor}`;
    newTask.task = task.task;

    /* {
      id: `TASK-${shortTask}-${uuid().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: "incomplete",
      color: `${task.color} - ${task.hexColor}`,
      task: task.task
    }; */
    return await ToDoModel.addTask(toDoList, newTask);
  };

  //  Update an existing todo item (full replace)
  static replaceTask = async (toDoList, taskID, update) => {
    const taskEntry = {
      id: `${taskID}`,
      updatedAt: new Date().toISOString(),
      status: update.status,
      color: update.color,
      task: update.task,
    };
    return await ToDoModel.replaceTask(toDoList, taskID, taskEntry);
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
    return await ToDoModel.updateTask(toDoList, taskID, updatedTask);
  };

  //  Delete a todo item
  static deleteTask = async (filename, taskID) => {
    console.log(`\t Coordinator : deleteTask(${filename}, ${taskID})`);
    return await ToDoModel.deleteTask(filename, taskID);
  };
}

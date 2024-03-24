import { v4 as uuid } from 'uuid';
import ToDoModel from '../models/to-do.model.js';
import fsp from 'fs/promises';


export default class toDoCoordinator {
  static showList = async (filename) => {
  return await ToDoModel.showList(filename);
  };

  static addTask = async (filename, add) => {
    const taskEntry = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      task: add,
  };
  return await ToDoModel.addTask(filename, taskEntry);
  };

  static deleteTask = async (filename, id) => {
    console.log('\t Coordinator : deleteTask()');
    return await ToDoModel.deleteTask(filename, id);
  };
}

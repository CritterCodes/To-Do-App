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

  static getWidget = (id) => {
    console.log('\t Coordinator : getWidget()');
    return WidgetsModel.getWidget(id);
  };

  static deleteWidget = (id) => {
    console.log('\t Coordinator : deleteWidget()');
    return WidgetsModel.deleteWidget(id);
  };

  static replaceWidget = (id, widget) => {
    console.log('\t Coordinator : replaceWidget()');
    const replaceWidget = {
      ...widget,
      id,
    };
    return WidgetsModel.replaceWidget(id, replaceWidget);
  };

  static updateWidget = (id, widget) => {
    console.log('\t Coordinator : replaceWidget()');
    return WidgetsModel.updateWidget(id, widget);
  };
}

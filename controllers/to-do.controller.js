/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/extensions */
import ToDoCoordinator from '../coordinators/to-do.coordinators.js';

//  show list
export const showList = async (req, res, next) => {
  try {
    const result = await ToDoCoordinator.showList(req.params.toDoList);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

//  show task
export const showTask = async (req, res, next) => {
  try {
    const result = await ToDoCoordinator.showTask(req.params.toDoList, req.params.taskID);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (ex) {
    next(ex);
  }
};

//  add task
export const addTask = async (req, res, next) => {
  console.log('Controller : addTask()');

  try {
    const result = await ToDoCoordinator.addTask(req.params.toDoList, req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

//  replace Task
export const replaceTask = async (req, res, next) => {
  try {
    const result = await ToDoCoordinator
      .replaceTask(req.params.toDoList, req.params.taskID, req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

// update Task
export const updateTask = async (req, res, next) => {
  try {
    const result = await ToDoCoordinator
      .updateTask(req.params.toDoList, req.params.taskID, req.body);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

//  delete task
export const taskDeletion = async (req, res, next) => {
  console.log(`Controller : deleteTask(${req.params.taskID})`);

  try {
    const result = await ToDoCoordinator.deleteTask(req.params.toDoList, req.params.taskID);

    if (result.error) {
      res.status(404).json();
    } else {
      res.status(200).json(result);
    }
  } catch (ex) {
    next(ex);
  }
};

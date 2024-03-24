import ToDoCoordinator from '../coordinators/to-do.coordinators.js';

//add task
export const addTask = async (req, res, next) => {
  console.log('Controller : addTask()');

  try {
    const result = await ToDoCoordinator.addTask(req.params.toDoList, req.params.addTask);
    res.status(201).json(result);
  } catch (ex) {
    next(ex);
  }
};

//show list
export const showList = async (req, res, next) => {
  console.log(`Controller : showList(${req.params.toDoList})`);

  const result = await ToDoCoordinator.showList(req.params.toDoList);
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json();
  }
};

//delete task
export const taskDeletion = async (req, res, next) => {
  console.log(`Controller : deleteTask(${req.params.deleteTask})`);

  const result = await ToDoCoordinator.deleteTask(req.params.toDoList, req.params.deleteTask);

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json();
  }
  
};



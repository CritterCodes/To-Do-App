/* eslint-disable import/extensions */
//  Imports
import { v4 as uuid } from 'uuid';
import List from '../classes/list.js';
import { db } from '../lib/database.js';
import Constants from '../lib/constants.js';
import listSchema from '../schemas/list.json' assert { type: 'json' };
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv();
addFormats(ajv);
const listValidate = ajv.compile(listSchema);

//  Function to read JSON data
const readList = async (name) => {
    try {
        let response;
        const list = await db.dbWidgets().findOne(
            { name },
            { projection: Constants.DEFAULT_PROJECTION },
          );
          console.log(list);
          if (!list) {
                response = {
                    status: false,
                    error: 'That list does not exist. Try anothe list name.',
                };
                console.log(response);
          } else {
            response = {
                status: true,
                list,
            };
          }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

const readTask = async (toDoList, taskID) => {
    try {
        let response;
        const tdList = await readList(toDoList);
        if (!tdList.status) {
            response = tdList;
            console.log(response);
        } else {
            const task = tdList.list.tasks.find((ftask) => ftask.taskID === taskID);
            if (!task) {
                response = {
                    status: false,
                    error: `That task does not exist on the ${tdList.list.name} list. Try double check your taskID and list name.`,
                };
                console.log(response);
            } else {
                response = {
                    status: true,
                    task,
                };
            }
        }
        return response;
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error;
    }
};

//  function to write json data
const writeTasks = async (name, list) => {
    try {
        let result;
        const tdList = await readList(name);
        if (!tdList.status) {
            result = await db.dbWidgets().insertOne(list);
        } else {
            result = await db.dbWidgets().replaceOne({ name }, list);
        }
        console.log('Data written to file successfully.');
        return result;
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

const removeTasks = async (tdList, taskID) => {
    const filteredList = tdList.list.tasks.filter((task) => task.taskID !== taskID);
    return filteredList;
};

export default class ToDoModel {
    //  Get a list of todo items
    static showList = async (toDoList) => {
        let response;
            try {
                // Read the existing tasks
                const tdList = await readList(toDoList);
                if (!tdList.status) {
                    response = tdList.error;
                    console.error(response);
                } else {
                    response = tdList.list;
                    console.log(tdList.list);
                }
            } catch (error) {
                return console.error('An error occurred while deleting the task:', error.message);
            }
            return response;
        };

    //  Get a single todo item by ID
    static showTask = async (toDoList, taskID) => {
        let response;
        try {
            // Read the existing tasks
            const task = await readTask(toDoList, taskID);
            if (!task.status) {
                response = task.error;
                console.error(response);
            } else {
                console.log(task.task);
                response = {
                    'requestedTask': task.task,
                };
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };

    //  Create a new todo
    static addTask = async (toDoList, task) => {
        let response;
        // Read the existing tasks from the file
        try {
            const tdList = await readList(toDoList);
            if (!tdList.status) {
                console.log(`Creating new list: ${toDoList}`);
                const newList = new List();
                newList.listID = `LIST-${toDoList.split(' ')
                .join('').substr(0, 8)}-${uuid().slice(-4)}`;
                newList.name = toDoList;
                newList.createdAt = new Date().toISOString();
                newList.tasks = [task];
                newList.completedTasks = [];
                response = {
                    'New List': newList,
                };

                const valid = listValidate(newList);
                if (!valid) {
                  throw validate.errors;
                }

                await writeTasks(toDoList, newList);
            } else {
                    tdList.list.tasks.push(task);
                    // Write the updated tasks back to the file
                    await writeTasks(toDoList, tdList.list);
                    console.log(`${task.task} added successfully.`);
                    response = {
                        task,
                        updatedList: tdList.list,
                    };
            }
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
        return response;
    };

    //  Update an existing todo item (full replace)
    static replaceTask = async (toDoList, taskID, update) => {
        let response = {};
        try {
            const tdList = await readList(toDoList);
            if (!tdList.status) {
                response = tdList.error;
            } else {
                const importedTask = await readTask(toDoList, taskID);
                if (!importedTask.status) {
                    response = importedTask.error;
                } else {
                    Object.keys(importedTask.task).forEach((taskKey) => {
                        if (update[taskKey] && taskKey === 'createdAt') {
                                if (Array.isArray(importedTask.task.createdAt)) {
                                    importedTask.task.createdAt.push(update[taskKey]);
                                } else {
                                        importedTask.task.createdAt = [
                                            importedTask.task.createdAt, update[taskKey],
                                        ];
                                }
                            } else if (update[taskKey]) {
                               importedTask.task[taskKey] = update[taskKey];
                            }
                    });
                    tdList.list.tasks = await removeTasks(tdList, taskID);
                    // Add the new task to the array
                    tdList.list.tasks.push(update);
                    // Write the updated tasks back to the file
                    await writeTasks(toDoList, tdList.list);
                    console.log(`${update.task} added successfully.`);
                    response = {
                        updatedTask: update,
                        updatedList: tdList.list,
                    };
                    console.log(response);
                }
            }
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
        return response;
    };

    //  Partially update an existing todo item (patch)
    //  Update an existing todo item (full replace)
    static updateTask = async (toDoList, taskID, update, updatedTask) => {
        let response;
        try {
            // Read the existing tasks
            const tdList = await readList(toDoList);
            if (!tdList.status) {
                response = tdList.error;
                console.error(response);
            } else {
                const importedTask = await readTask(toDoList, taskID);
                if (!importedTask.status) {
                    response = importedTask.error;
                } else {
                    Object.keys(importedTask.task).forEach((taskKey) => {
                        if (updatedTask[taskKey] && taskKey === 'createdAt') {
                                if (Array.isArray(importedTask.task.createdAt)) {
                                    importedTask.task.createdAt.push(updatedTask[taskKey]);
                                } else {
                                        importedTask.task.createdAt = [
                                            importedTask.task.createdAt, updatedTask[taskKey],
                                        ];
                                }
                            } else if (updatedTask[taskKey]) {
                               importedTask.task[taskKey] = updatedTask[taskKey];
                            }
                    });
                    if (!importedTask.task.update) {
                        importedTask.task.update = [update];
                    } else {
                        importedTask.task.update.push(update);
                    }

                    tdList.list.tasks = tdList.list.tasks
                        .filter((filteredTask) => filteredTask.taskID !== taskID);

                    if (importedTask.task.status === 'completed') {
                        tdList.list.completedTasks.push(importedTask.task);
                    } else {
                        tdList.list.tasks.push(importedTask.task);
                    }
                    response = {
                        updatedTask: importedTask.task,
                        updatedList: tdList.list,
                    };
                }
                writeTasks(toDoList, tdList.list);
                console.log(response);
            }
        } catch (error) {
            console.error('An error occurred while updating the task:', error.message);
        }
        return response;
    };

    //  Delete a todo item
    static deleteTask = async (toDoList, taskID) => {
        let response;
        try {
            // Read the existing tasks
            const tdList = await readList(toDoList);
            if (!tdList.status) {
                response = tdList.error;
                console.error(response);
            } else {
                const removedTask = await readTask(toDoList, taskID);
                console.log(removedTask.task);
                if (!removedTask.status) {
                    response = removedTask.error;
                } else {
                    tdList.list.tasks = removeTasks(tdList, taskID);
                    response = {
                        deletedTask: removedTask.task,
                        newList: tdList.list,
                    };
                    // Filter out the task with the specified id

                    // Write the updated tasks back to the file
                    await writeTasks(toDoList, tdList.list);
                    console.log('Task deleted successfully.');
                    console.log(response);
                }
            }
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
        return response;
    };
}

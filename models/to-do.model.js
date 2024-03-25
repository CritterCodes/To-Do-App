/* eslint-disable import/extensions */
//  Imports
import fs from 'fs';
import fsp from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { List } from '../classes/classes.js';

//  Function to read JSON data
const readTasks = async (filename) => {
    try {
        const data = await fsp.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
};

//  function to write json data
const writeTasks = async (filename, data) => {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fsp.writeFile(filename, jsonData);
        console.log('Data written to file successfully.');
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
};

export default class ToDoModel {
    //  Get a list of todo items
    static showList = async (toDoList) => {
        const filename = `./toDoLists/${toDoList}.json`;

        try {
            // Read the existing tasks
            const tdlist = await readTasks(filename);
            console.log(tdlist);
            return tdlist;
        } catch (error) {
            return console.error('An error occurred while deleting the task:', error.message);
        }
    };

    //  Get a single todo item by ID
    static showTask = async (toDoList, taskId) => {
        try {
            const filename = `./toDoLists/${toDoList}.json`;
            // Read the existing tasks
            const tdlist = await readTasks(filename);
            const requestedTask = tdlist.tasks.find((task) => task.id === taskId);

            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log('Task deleted successfully.');
            console.log(requestedTask);
            const response = {
                'Requested Task': requestedTask,
            };
            return response;
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
    };

    //  Create a new todo
    static addTask = async (toDoList, task) => {
        const filename = `./toDoLists/${toDoList}.json`;
        const fileExists = fs.existsSync(filename);
        const newList = new List();
        newList.listID = `LIST-${toDoList.substr(0, 8)}-${uuid().slice(-4)}`;
        newList.name = toDoList;
        newList.createdAt = new Date().toISOString();
        newList.tasks = [];
        newList.completedTasks = [];
        console.log(`${filename}`);
        if (!fileExists) {
            await fsp.writeFile(filename, JSON.stringify(newList, null, 2));
        }

        try {
            // Read the existing tasks from the file
            const tdlist = await readTasks(filename);

            if (task.status === 'completed') {
                tdlist.completedTasks.push(task);
            } else {
                tdlist.tasks.push(task);
            }

            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log(`${task.task} added successfully.`);
            const response = {
                task,
                updatedList: tdlist,
            };
            return response;
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
    };

    //  Update an existing todo item (full replace)
    static replaceTask = async (toDoList, taskID, update) => {
        const filename = `./toDoLists/${toDoList}.json`;
        let response = {};

        try {
            // Read the existing tasks from the file
            const tdlist = await readTasks(filename);
            const task = tdlist.tasks.find((ftask) => ftask.taskID === taskID);

            if (!task) {
                response = {
                    error: 'Could not find task, wrong taskID.',
                };
            } else {
                // Add the new task to the array
                tdlist.tasks.push(update);
                // Write the updated tasks back to the file
                await writeTasks(filename, tdlist);
                console.log(`${update.task} added successfully.`);
                console.log(response);
            }
            return response;
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
    };

    //  Partially update an existing todo item (patch)
    //  Update an existing todo item (full replace)
    static updateTask = async (toDoList, taskID, update) => {
        try {
            const filename = `./toDoLists/${toDoList}.json`;
            // Read the existing tasks
            const tdlist = await readTasks(filename);
            const task = tdlist.tasks.find((ftask) => ftask.taskID === taskID);
            let response = {};
            if (!task) {
                response = {
                    error: 'Task not found, Invalid taskID.',
                };
            } else {
                tdlist.tasks = tdlist.tasks
                    .filter((filteredTask) => filteredTask.taskID !== taskID);
                Object.keys(task).forEach((taskKey) => {
                    if (update[taskKey]) {
                        task[taskKey] = update[taskKey];
                    } else {
                        // eslint-disable-next-line no-self-assign
                        task[taskKey] = task[taskKey];
                    }
                });
            }
            console.log(response);
            return response;
        } catch (error) {
            console.error('An error occurred while updating the task:', error.message);
        }
    };

    //  Delete a todo item
    static deleteTask = async (toDoList, taskID) => {
        try {
            const filename = `./toDoLists/${toDoList}.json`;
            // Read the existing tasks
            const tdlist = await readTasks(filename);
            const removedTask = tdlist.tasks.find((task) => task.id === taskID);
            let response = {
            };
            console.log(removedTask);
            if (!removedTask) {
                response = {
                    error: 'Task does not exist, invalid taskID.',
                };
                return response;
            }
                response = {
                    deletedTask: removedTask,
                    newList: tdlist,
                };
                // Filter out the task with the specified id
                tdlist.tasks = tdlist.tasks.filter((task) => task.id !== taskID);

                // Write the updated tasks back to the file
                await writeTasks(filename, tdlist);
                console.log('Task deleted successfully.');
                console.log(response);
                return response;
        } catch (error) {
            console.error('An error occurred while deleting the task:', error.message);
        }
    };
}

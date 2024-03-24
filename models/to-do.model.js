//  Imports
import fs from 'fs';
import fsp from 'fs/promises';
import yargs from 'yargs';
import { v4 as uuid } from 'uuid';


//  Function to read JSON data
const readTasks = async (filename) => {
    try {
        const data = await fsp.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('An error occurred while reading the file:', error.message);
        throw error; // Re-throw the error for handling in the caller function
    }
}

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
            const requestedTask = tdlist.tasks.find((task) => task.id === taskId );
          
            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log('Task deleted successfully.');
            const response = {
                "Requested Task": requestedTask,
          };
          return response;
      } catch (error) {
          console.error('An error occurred while deleting the task:', error.message);
      };
    };

    //  Create a new todo
    static addTask = async (toDoList, taskEntry) => {
        const filename = `./toDoLists/${toDoList}.json`;
        const fileExists = fs.existsSync(filename);
        const newToDoList = {
            listID: `LIST-${toDoList.substr(0, 8)}-${uuid().slice(-4)}`,
            name: toDoList,
            createdAt: new Date().toISOString(),
            tasks: [],
            completedTasks: []
        };
        console.log(`${filename}`);
        if (!fileExists) {
            await fsp.writeFile(filename, JSON.stringify(newToDoList, null, 2));
        }

        try {
            // Read the existing tasks from the file
            const tdlist = await readTasks(filename);
            
            // Add the new task to the array
            tdlist.tasks.push(taskEntry);
            
            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log(`${taskEntry.task} added successfully.`);
            const response = {
                newTask: taskEntry,
                updatedList: tdlist}
            return response;
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
    };

    //  Update an existing todo item (full replace)
    static replaceTask = async (toDoList, taskID, update) => {
        const filename = `./toDoLists/${toDoList}.json`;
        await ToDoModel.deleteTask(toDoList, taskID);

        try {
            // Read the existing tasks from the file
            const tdlist = await readTasks(filename);
            
            // Add the new task to the array
            tdlist.tasks.push(update);
            
            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log(`${update.task} added successfully.`);
            const response = {
                updatedTask: update,
                updatedList: tdlist}
            return response;
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
    };

    //  Partially update an existing todo item (patch)
    //  Update an existing todo item (full replace)
    static updateTask = async (toDoList, taskEntry) => {
        const filename = `./toDoLists/${toDoList}.json`;
        const fileExists = fs.existsSync(filename);
        const newToDoList = {
            listID: `LIST-${toDoList.substr(0, 8)}-${uuid().slice(-4)}`,
            name: toDoList,
            createdAt: new Date().toISOString(),
            tasks: [],
            completedTasks: []
        };

        try {
            // Read the existing tasks from the file
            const tdlist = await readTasks(filename);
            
            // Add the new task to the array
            tdlist.tasks.push(taskEntry);
            
            // Write the updated tasks back to the file
            await writeTasks(filename, tdlist);
            console.log(`${taskEntry.task} added successfully.`);
            const response = {
                newTask: taskEntry,
                updatedList: tdlist}
            return response;
        } catch (error) {
            console.error('An error occurred while adding the task:', error.message);
        }
    };

    //  Delete a todo item
    static deleteTask = async (toDoList, taskID) => {
        try {
        const filename = `./toDoLists/${toDoList}.json`;
          // Read the existing tasks
          const tdlist = await readTasks(filename);
          const removedTask = tdlist.tasks.find((task) => task.id === taskID );
          // Filter out the task with the specified id
          tdlist.tasks = tdlist.tasks.filter((task) => task.id !== taskID);
          
          // Write the updated tasks back to the file
          await writeTasks(filename, tdlist);
          console.log('Task deleted successfully.');
          const response = {
            DeletedTask: removedTask,
            NewList: tdlist
          };
          return response;
      } catch (error) {
          console.error('An error occurred while deleting the task:', error.message);
      };
    };
  }
  
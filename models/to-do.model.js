//  Imports
import fs from 'fs';
import fsp from 'fs/promises';
import yargs from 'yargs';
import { v4 as uuidv4 } from 'uuid';


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
    static showList = async (toDoList) => {
        const filename = `./toDoLists/${toDoList}.json`;
        
        try {
            // Read the existing tasks
            const tdlist = await readTasks(filename);
            console.log(`--------------------------------------------------\nList name: ${tdlist.name}\nCreated on ${tdlist.createdAt}\n--------------------------------------------------\n`);
            tdlist.tasks.forEach((task) => {
                console.log(`Task ID: ${task.id}\n\tDate-Time: ${task.createdAt}\n\t\tTask: ${task.task}\n--------------------------------------------------\n`);
            });
            return tdlist;
      } catch (error) {
          return console.error('An error occurred while deleting the task:', error.message);
      }
    };
  
    static addTask = async (toDoList, taskEntry) => {
        const filename = `./toDoLists/${toDoList}.json`;
        const fileExists = fs.existsSync(filename);
        const newToDoList = {
            name: toDoList,
            createdAt: new Date().toISOString(),
            tasks: [],
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
  
    static deleteTask = async (toDoList, deleteTask) => {
        try {
        const filename = `./toDoLists/${toDoList}.json`;
          // Read the existing tasks
          const tdlist = await readTasks(filename);
          const taskId = deleteTask;
          const removedTask = tdlist.tasks.find((task) => task.id === taskId );
          // Filter out the task with the specified id
          tdlist.tasks = tdlist.tasks.filter((task) => task.id !== taskId);
          
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
  
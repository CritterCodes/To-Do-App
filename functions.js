/* eslint-disable no-console */
import fsp from 'fs/promises';

//  Functions for To-Do App

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

export const addTask = async (filename, taskEntry) => {
    try {
        // Read the existing tasks from the file
        const tdlist = await readTasks(filename);
        
        // Add the new task to the array
        tdlist.tasks.push(taskEntry);
        
        // Write the updated tasks back to the file
        await writeTasks(filename, tdlist);
        console.log(`${taskEntry.task} added successfully.`);
    } catch (error) {
        console.error('An error occurred while adding the task:', error.message);
    }
};

export const taskDeletion = async (filename, deleteTask) => {
    try {
        // Read the existing tasks
        const tdlist = await readTasks(filename);
        const taskId = deleteTask;
        
        // Filter out the task with the specified id
        tdlist.tasks = tdlist.tasks.filter((task) => task.id !== taskId);
        
        // Write the updated tasks back to the file
        await writeTasks(filename, tdlist);
        console.log('Task deleted successfully.');
    } catch (error) {
        console.error('An error occurred while deleting the task:', error.message);
    }
  };

export const showList = async (filename) => {
    try {
        // Read the existing tasks
        const tdlist = await readTasks(filename);
        console.log(`--------------------------------------------------\nList name: ${tdlist.name}\nCreated on ${tdlist.created}\n--------------------------------------------------\n`);
        tdlist.tasks.forEach((task) => {
          console.log(`Task ID: ${task.id}\n\tDate-Time: ${task.createdAt}\n\t\tTask: ${task.task}\n--------------------------------------------------\n`);
          });
    } catch (error) {
        return console.error('An error occurred while deleting the task:', error.message);
    }
    return null;
  };
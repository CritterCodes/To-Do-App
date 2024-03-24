/* eslint-disable import/extensions */
/* eslint-disable no-console */
//  Imports
import fs from 'fs';
import fsp from 'fs/promises';
import yargs from 'yargs';
import { v4 as uuidv4 } from 'uuid';
import { addTask, showList, taskDeletion } from './functions.js';

//  variables
const {
  toDoList,
  add,
  deleteTask,
  list,
 } = yargs(process.argv.slice(2))
  .scriptName('yargs')
  .usage('Usage: $0 --toDoList <<List>> --add <<Task>>')
  .example('$0 --toDoList Chores --add "Sweep the kitchen."')
  .option('T', {
      alias: 'toDoList',
      describe: 'Choose the List you would like to edit. Do not inlude .js, only the name of your To-Do list.',
      demandOption: 'A to-Do list is required',
      type: 'string',
  })
  .option('a', {
      alias: 'add',
      describe: 'Add a Task to your to-do list.',
      type: 'string',
  })
  .option('d', {
      alias: 'deleteTask',
      describe: 'Delete a Task from your to-do list using the task id, use "--toDoList <<your list>> --list" to find the id of your task.',
      type: 'string',
  })
  .option('l', {
      alias: 'list',
      describe: 'list current tasks on a to do list. Must be used with --toDoList',
  })
  .showHelpOnFail()
  .parse();

const id = uuidv4();
const filename = `./toDoLists/${toDoList}.json`;
const fileExists = fs.existsSync(filename);
const newToDoList = {
  name: toDoList,
        createdAt: new Date().toISOString(),
  tasks: [],
};
const taskEntry = {
    id,
    createdAt: new Date().toISOString(),
    task: add,
};

//  logic
if (add) {
    try {
      if (!fileExists) {
        await fsp.writeFile(filename, JSON.stringify(newToDoList, null, 2));
    }
    addTask(filename, taskEntry);
    } catch (err) {
        console.error('An error occurred while reading the file:', err.message);
    }
  } else if (deleteTask) {
    try {
        if (fileExists) {
            taskDeletion(filename, deleteTask);
        }
    } catch (err) {
        console.error('That file doesnt exist');
    }
  } 
  
  if (list) {
    try {
      if (fileExists) {
      showList(filename);
    } else {
      console.error('Sorry that To-Do list doesn\'t exist.');
    }
    } catch (err) {
        console.error('An error occurred while listing the To-Do list:', err.message);
    }
  }
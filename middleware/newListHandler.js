import fs from 'fs';
import fsp from 'fs/promises';

const middleware = () => async (req, res, next) => {
    const filename = `./toDoLists/${req.param.toDoList}.json`;
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

    req.body.validationPassed = true;
    next();
  };
  
  export default middleware;
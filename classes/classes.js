export class Task {
    constructor (taskID, createdAt, status, color, task) {
        this.taskID = taskID;
        this.createdAt = createdAt;
        this.status = status;
        this.color = color;
        this.status = task;
  }
}

export class List {
    constructor (listID, name, createdAt, tasks, completedTasks) {
        this.listID = listID;
        this.name = name ;
        this.createdAt = createdAt;
        this.tasks = tasks;
        this.completedTasks = completedTasks;
    }
}
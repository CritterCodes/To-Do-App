export default class List {
    constructor(listID, name, createdAt, tasks, completedTasks) {
        this.listID = listID;
        this.name = name;
        this.createdAt = createdAt;
        this.tasks = tasks;
        this.completedTasks = completedTasks;
    }
}

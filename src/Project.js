import { pubsub } from "./pubsub";
export default class Project {
    #name;
    #taskMap;
    
    constructor(projectName) {
        this.#name = projectName;
        this.#taskMap = new Map();
        pubsub.subscribe("deleteTaskIfPresent", this.deleteTask.bind(this));
    }

    getName() {
        return this.#name;
    }

    getAllTasks() {
        let tasks = [];
        for (const [key, value] of this.#taskMap) {
            tasks.push(value);
        }
        return tasks;
    }

    addTask(taskObj) {
        this.#taskMap.set(taskObj.getId(), taskObj);
    }

    deleteTask(taskObj) {
        if (this.#taskMap.has(taskObj.getId())){
            this.#taskMap.delete(taskObj.getId());
        }
    }
}
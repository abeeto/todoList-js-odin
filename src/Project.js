import { pubsub } from "./pubsub";
export default class Project {
    #name;
    #taskMap;
    
    constructor(projectName) {
        this.#name = projectName;
        this.#taskMap = new Map();
        console.log(`Created Project: ${this.#name}`);
        pubsub.subscribe("createTaskToProject", this.addTaskToProject.bind(this));
    }

    getName() {
        return this.#name;
    }

    getAllTasks() {
        let tasks = [];
        for (const [key, value] of this.#taskMap) {
            tasks.push(value);
        }
        console.log(tasks);
        return tasks;
    }

    addTaskToProject({taskObject, projectName}) {
        // TODO: make project subscribe to the taskChangeEvent so it updates if task changes
        if (projectName === this.#name){
            this.#taskMap.set(taskObject.getId(), taskObject);
            console.log(Object.fromEntries(this.#taskMap));
        }
    }
}
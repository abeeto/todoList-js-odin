import { pubsub } from "./pubsub";
export default class Project {
    #name;
    #taskMap;
    
    constructor(projectName) {
        this.#name = projectName;
        this.#taskMap = new Map();
        console.log(`Created ${this.#name}`);
        pubsub.subscribe("createTaskToProject", this.addTaskToProject.bind(this));
    }

    get name() {
        return this.#name;
    }

    addTaskToProject({taskObject, projectName}) {
        if (projectName === this.#name){
            console.log(taskObject.toString());
            this.#taskMap.set(taskObject.getId(), taskObject);
            console.log(Object.fromEntries(this.#taskMap));
        }
    }
}
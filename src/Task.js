import { v4 as uuidv4} from "uuid";
import { pubsub } from "./pubsub";
export default class Task {
    #name;
    #description;
    #dueDate;
    #priority;
    #id;
    #isDone;
    constructor({name, description, dueDate, priority}) {
        this.#name = name;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#id = uuidv4();
        this.#isDone = false;
    }
    
    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
        pubsub.publish("anyChangeInTask");
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
        pubsub.publish("anyChangeInTask");
    }

    getDueDate() {
        return this.#dueDate;
    }

    setDueDate(dueDate) {
        this.#dueDate = dueDate;
        pubsub.publish("anyChangeInTask");
    }

    toggleIsDone(){
        this.#isDone = !this.#isDone;
    }
    getIsDone(){
        return this.#isDone;
    }

    getPriority() {
        return this.#priority;
    }

    setPriority(priority) {
        this.#priority = priority;
    }

    toString() {
        return `ID: ${this.#id} NAME: ${this.#name} DESC: ${this.#description} DUE: ${this.#dueDate} PRIORITY: ${this.#priority}`
    }
}
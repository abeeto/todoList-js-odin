import { v4 as uuidv4} from "uuid";
export default class Task {
    #name;
    #description;
    #dueDate;
    #priority;
    #id;
    constructor({name, description, dueDate, priority}) {
        this.#name = name;
        this.#description = description;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#id = uuidv4();
    }
    
    getId() {
        return this.#id;
    }

    getName() {
        return this.#name;
    }

    getDescription() {
        return this.#description;
    }

    getDueDate() {
        return this.#dueDate;
    }

    toString() {
        return `ID: ${this.#id} NAME: ${this.#name} DESC: ${this.#description} DUE: ${this.#dueDate} PRIORITY: ${this.#priority}`
    }
}
import { v4 as uuidv4} from "uuid";
export class Task {
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
        this.relayTaskCreation();
    }

    relayTaskCreation() {
        console.log(`A task has been created! ID: ${this.#id}`);
    }
}
import { v4 as uuidv4} from "uuid";
import Broadcast from "./Broadcast.js"
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
        console.log(Broadcast.relayTaskCreated(this.#id));
    }
}
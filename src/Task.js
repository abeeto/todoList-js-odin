import { pubsub } from "./pubsub";
export default class Task {
  #name;
  #description;
  #dueDate;
  #priority;
  #isDone;
  constructor({ name, description, dueDate, priority }) {
    this.#name = name;
    this.#description = description;
    this.#dueDate = dueDate;
    this.#priority = priority;
    this.#isDone = false;
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

  toggleIsDone() {
    this.#isDone = !this.#isDone;
  }
  getIsDone() {
    return this.#isDone;
  }

  getPriority() {
    return this.#priority;
  }

  setPriority(priority) {
    this.#priority = priority;
  }

  toStringObj() {
    return `{"name": "${this.#name}", "dueDate": "${this.#dueDate}", "description": "${this.#description}", "priority": "${this.#priority}", "isDone": "${this.#isDone}"}`;
  }
}

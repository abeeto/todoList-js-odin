import { pubsub } from "./pubsub";
export default class Project {
  #name;
  #taskIdList;

  constructor(projectName) {
    this.#name = projectName;
    this.#taskIdList = [];
    pubsub.subscribe("deleteTaskIfPresent", this.deleteTask.bind(this));
  }

  getName() {
    return this.#name;
  }

  getAllTasks() {
    return this.#taskIdList;
  }

  addTask(taskId) {
    this.#taskIdList.push(taskId);
  }

  deleteTask(taskId) {
    this.#taskIdList = this.#taskIdList.filter((val) => val !== taskId);
  }
}

import { pubsub } from "./pubsub";
export default class Project {
  #name;
  #taskIdSet;

  constructor(projectName) {
    this.#name = projectName;
    this.#taskIdSet = new Set();
    pubsub.subscribe("deleteTaskIfPresent", (taskId) => {
      this.deleteTask(taskId);
    });
  }

  getName() {
    return this.#name;
  }

  getAllTaskIds() {
    return Array.from(this.#taskIdSet);
  }

  setAllTaskIds(taskIdList) {
    this.#taskIdSet = new Set(taskIdList);
  }

  addTaskId(taskId) {
    this.#taskIdSet.add(taskId);
  }

  deleteTask(taskId) {
    console.log(`${this.getName()} is deleting ${taskId}`);
    this.#taskIdSet.delete(taskId);
    pubsub.publish("projectHasDeletedTask");
  }
}

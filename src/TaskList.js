import { pubsub } from "./pubsub";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
function TaskList() {
  let list = {};
  const addTaskToTaskList = (taskObj) => {
    const taskId = uuidv4();
    list[taskId] = taskObj;
    updateLocalStorageTasksList();
  };
  const removeTaskFromTasksList = (taskId) => {
    delete list[taskId];
    updateLocalStorageTasksList();
  };
  const getTaskById = (taskId) => {
    return list[taskId];
  };
  const getIdByTask = (taskObj) => {
    return Object.keys(list).find((key) => {
      return list[key].toStringObj() === taskObj.toStringObj();
    });
  };
  const getEntireTaskList = () => {
    return list;
  };
  const toJSON = () => {
    let taskObjsStringArray = [];
    for (const [key, value] of Object.entries(list)) {
      taskObjsStringArray.push(`"${key}" : ${value.toStringObj()}`);
    }
    return `{${taskObjsStringArray.join()}}`;
  };
  const setListFromLocalStorage = (taskListString) => {
    let taskListObject = JSON.parse(taskListString);
    for (let [taskId, taskObjData] of Object.entries(taskListObject)) {
      list[taskId] = new Task(taskObjData);
    }
  };
  const updateLocalStorageTasksList = () => {
    localStorage.setItem("taskList", toJSON());
  };
  pubsub.subscribe("taskCreated", addTaskToTaskList);
  pubsub.subscribe("anyChangeInTask", updateLocalStorageTasksList);
  pubsub.subscribe("deleteTaskIfPresent", removeTaskFromTasksList);

  return {
    getTaskById,
    getIdByTask,
    toJSON,
    setListFromLocalStorage,
    getEntireTaskList,
  };
}

export default TaskList();

import ProjectsList from "./ProjectsList";
import TaskList from "./TaskList";
import createTaskElement from "./createTaskElement";

function getTaskViewHolderNode() {
  let taskViewHolderNode = document.querySelector("#task-view-wrapper");
  if (taskViewHolderNode === null) {
    taskViewHolderNode = document.createElement("div");
    taskViewHolderNode.id = "task-view-wrapper";
    taskViewHolderNode.classList.add("wrapper");
    document.querySelector("body").appendChild(taskViewHolderNode);
  }
  return taskViewHolderNode;
}

function createTaskView(projectName) {
  const taskViewHolderNode = getTaskViewHolderNode();
  const taskIds = ProjectsList.getAllTaskIdsOfProject(projectName);
  const tasks = taskIds.map((id) => {
    const taskObj = TaskList.getTaskById(id);
    return taskObj;
  });
  const taskNodesToAppend = tasks.map((taskObj) => {
    return createTaskElement({ taskObj, projectName });
  });
  taskViewHolderNode.replaceChildren(...taskNodesToAppend);
}

export default { getTaskViewHolderNode, createTaskView };

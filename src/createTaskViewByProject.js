import ProjectsList from "./ProjectsList"; 
import createTaskElement from "./createTaskElement";
function getTaskViewHolderNode(){
    let taskViewHolderNode = document.querySelector("#task-view-wrapper");
    if (taskViewHolderNode === null) {
        taskViewHolderNode = document.createElement("div");
        taskViewHolderNode.id = "task-view-wrapper";
        taskViewHolderNode.classList.add("wrapper");
        document.querySelector("body").appendChild(taskViewHolderNode);
    }
    return taskViewHolderNode;
}

export default function createTaskView(projectName) {
    const taskViewHolderNode = getTaskViewHolderNode(); 
    const tasksToRender = ProjectsList.getAllTasksOfProject(projectName);
    const taskNodesToAppend = tasksToRender.map(taskObj => createTaskElement({taskObj, projectName}));
    taskViewHolderNode.replaceChildren(...taskNodesToAppend);
}

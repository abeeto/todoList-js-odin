import ProjectsList from "./ProjectsList"; 
import { pubsub } from "./pubsub";
function getTaskViewHolderNode(){
    let taskViewHolderNode = document.querySelector(".task-view-wrapper");
    if (taskViewHolderNode === null) {
        taskViewHolderNode = document.createElement("div");
        taskViewHolderNode.classList.add("task-view-wrapper");
        document.querySelector("body").appendChild(taskViewHolderNode);
    }
    return taskViewHolderNode;
}

function renderTask(taskObj){
    const taskHolderNode = document.createElement("div");
    taskHolderNode.classList.add("task-wrapper");
    const taskInfoItems= [taskObj.getName(), taskObj.getDescription(), taskObj.getDueDate()]
    taskInfoItems.forEach(infoItem => {
        let infoNode = document.createElement("div");
        infoNode.innerText = infoItem;
        taskHolderNode.appendChild(infoNode);
    });
    return taskHolderNode;
}

export const renderTasks = function(projectName) {
    const taskViewHolderNode = getTaskViewHolderNode(); 
    const tasksToRender = ProjectsList.getAllTasksOfProject(projectName);
    const taskNodesToAppend = tasksToRender.map(task => renderTask(task));
    taskViewHolderNode.replaceChildren(...taskNodesToAppend);
    pubsub.subscribe("createTaskToProject", renderTasks.bind(null, projectName));
}






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

function renderTask({taskObj, projectName}){
    const taskHolderNode = document.createElement("div");
    taskHolderNode.classList.add("task-wrapper");
    if (taskObj.getIsDone()) {
        taskHolderNode.classList.add("task-done");
    }
    const taskInfoItems= [taskObj.getName(), taskObj.getDescription(), taskObj.getDueDate()];
    const taskInfoSetters = [taskObj.setName, taskObj.setDescription, taskObj.setDueDate];
    for (let i = 0; i < taskInfoItems.length; i++){
        let infoNode = document.createElement("div");
        infoNode.innerText = taskInfoItems[i];
        infoNode.addEventListener("dblclick", (e) => {
            taskInfoSetters[i].bind(taskObj)(prompt("enter your property"));
            createTaskView(projectName);
        })
        taskHolderNode.appendChild(infoNode);
    }
    const taskDoneButton = document.createElement("button");
    taskDoneButton.innerText = taskObj.getIsDone() ? "To Do" : "Done";

    taskDoneButton.addEventListener("click", e => {
        taskObj.toggleIsDone();
        taskHolderNode.classList.toggle("task-done");
        taskDoneButton.innerText = taskObj.getIsDone() ? "To Do" : "Done";
    })
    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerText = "Delete";
    deleteTaskButton.addEventListener("click", (e) => {
        pubsub.publish("deleteTaskIfPresent", {taskObj});
        createTaskView(projectName);
    })

    taskHolderNode.appendChild(taskDoneButton);
    taskHolderNode.appendChild(deleteTaskButton);
    return taskHolderNode;
}

export default function createTaskView(projectName) {
    const taskViewHolderNode = getTaskViewHolderNode(); 
    const tasksToRender = ProjectsList.getAllTasksOfProject(projectName);
    const taskNodesToAppend = tasksToRender.map(taskObj => renderTask({taskObj, projectName}));
    taskViewHolderNode.replaceChildren(...taskNodesToAppend);
}

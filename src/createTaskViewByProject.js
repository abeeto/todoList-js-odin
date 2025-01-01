import ProjectsList from "./ProjectsList"; 
import { pubsub } from "./pubsub";
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

function renderTask({taskObj, projectName}){
    const taskHolderNode = document.createElement("div");
    taskHolderNode.classList.add("wrapper", "wrapper-task", "flow-y-bottom", "flex");
    // if (taskObj.getIsDone()) {
    //     taskHolderNode.classList.add("task-done");
    // }
    // const taskInfoItems = [taskObj.getName(), taskObj.getDescription(), taskObj.getDueDate()];
    // const taskInfoSetters = [taskObj.setName, taskObj.setDescription, taskObj.setDueDate];

    const createToggleTaskDoneButton = () => {
        const toggleTaskDoneButtonNode = document.createElement("button");
        toggleTaskDoneButtonNode.classList.add("task__button", "task__button_toDo");
        toggleTaskDoneButtonNode.dataset.isDone = "" + taskObj.getIsDone();
        toggleTaskDoneButtonNode.innerText = "TEST";
        toggleTaskDoneButtonNode.addEventListener("click", (e) => {
            e.target.dataset.isDone =  e.target.dataset.isDone === "true" ? "false" : "true"
            taskObj.toggleIsDone(e.target.dataset.isDone);
        })
        return toggleTaskDoneButtonNode;
    }

    const taskInfoItemsHolder = document.createElement("div");
    taskInfoItemsHolder.classList.add("wrapper", "task__main-content", "flex", "flex-col");

    const createTaskInfoItem = (innerText) => {
        const taskInfoItem = document.createElement("div");
        taskInfoItem.innerText = innerText;
        taskInfoItem.classList.add("flex", "flex-item-grow");

        return taskInfoItem;
    }
    const taskTitleInfoNode = createTaskInfoItem(taskObj.getName());
    taskTitleInfoNode.classList.add("taskHeadingText", "flow-y-bottom");
    const taskDescInfoNode = createTaskInfoItem(taskObj.getDescription());
    taskDescInfoNode.classList.add("taskDescription", "taskBaseText", "flow-y-bottom");
    
    // "wrapper-task__main-content"

    const taskPriorityNode = createTaskInfoItem(taskObj.getPriority());
    taskPriorityNode.innerText = "Priority: " + taskPriorityNode.innerText.toUpperCase();
    taskPriorityNode.classList.remove("flex-item-grow");

    const taskDueDateNode = createTaskInfoItem(taskObj.getDueDate());
    taskDueDateNode.innerText = "Due Date: " + taskDueDateNode.innerText;
    taskDueDateNode.classList.remove("flex-item-grow");

    const taskDueInfoNode = document.createElement("div");
    taskDueInfoNode.classList.add("flex", "flex-space-apart", "taskBaseText", "flow-bottom-y");

    taskDueInfoNode.appendChild(taskPriorityNode);
    taskDueInfoNode.appendChild(taskDueDateNode);

    const taskActionsNode = document.createElement("div");
    taskActionsNode.classList.add("flex", "flex-space-apart", "taskBaseText", "flow-bottom-y");

    const createButton = (innerText, eventListenerFn) => {
        const button = document.createElement("button");
        button.innerText = innerText;
        button.addEventListener("click",eventListenerFn);

        return button;
    }
    const updateTaskActionNodes = document.createElement("div");
    const deleteTaskButton = createButton("Delete Task", () => {
        pubsub.publish("deleteTaskIfPresent", taskObj);
        createTaskView(projectName);
    });
    const editTaskButton = createButton("Edit Task", () => {});



    updateTaskActionNodes.appendChild(editTaskButton);
    updateTaskActionNodes.appendChild(deleteTaskButton);

    const toggleTaskDoneButtonNode = createToggleTaskDoneButton();
    let nodesHiddenByDefault = [taskDescInfoNode, taskDueInfoNode, deleteTaskButton, editTaskButton, toggleTaskDoneButtonNode];
    nodesHiddenByDefault.forEach(node => node.dataset.isHidden = "true");
    toggleTaskDoneButtonNode.dataset.isHidden = "false";

    taskActionsNode.appendChild(createButton("Expand", function() {
        nodesHiddenByDefault.forEach(node => node.dataset.isHidden = node.dataset.isHidden === "true" ? "false" : "true");
        this.innerText = taskDescInfoNode.dataset.isHidden === "true" ? "Expand" : "Hide";
    }));

    taskActionsNode.appendChild(updateTaskActionNodes);

    taskInfoItemsHolder.appendChild(taskTitleInfoNode);
    taskInfoItemsHolder.appendChild(taskDueInfoNode);
    taskInfoItemsHolder.appendChild(taskDescInfoNode);
    taskInfoItemsHolder.appendChild(taskActionsNode);

    taskHolderNode.appendChild(toggleTaskDoneButtonNode);
    taskHolderNode.appendChild(taskInfoItemsHolder);
    return taskHolderNode;
}

export default function createTaskView(projectName) {
    const taskViewHolderNode = getTaskViewHolderNode(); 
    const tasksToRender = ProjectsList.getAllTasksOfProject(projectName);
    const taskNodesToAppend = tasksToRender.map(taskObj => renderTask({taskObj, projectName}));
    taskViewHolderNode.replaceChildren(...taskNodesToAppend);
}

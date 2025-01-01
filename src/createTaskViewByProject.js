import ProjectsList from "./ProjectsList"; 
import { pubsub } from "./pubsub";
import renderEditableTask from "./createEditableTaskView";
import ElementsHelper from "./ElementsHelper";

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

function createToggleTaskDoneButton(taskObj) {
    const toggleTaskDoneButtonNode = document.createElement("button");
    toggleTaskDoneButtonNode.classList.add("task__button", "task__button_toDo"); 
    const undoneTaskIconSVG ='<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#c7c7c7" d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>';
    const completedTaskIconSVG = '<svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#ba4949" d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>';
    toggleTaskDoneButtonNode.innerHTML = taskObj.getIsDone() ? completedTaskIconSVG : undoneTaskIconSVG;
    toggleTaskDoneButtonNode.addEventListener("click", function() {
        this.dataset.isDone =  this.dataset.isDone === "true" ? "false" : "true";
        taskObj.toggleIsDone(this.dataset.isDone === "true");
        console.log(taskObj.getIsDone())
        this.innerHTML = taskObj.getIsDone() ? completedTaskIconSVG : undoneTaskIconSVG;
    })
    return toggleTaskDoneButtonNode;
}

function renderTask({taskObj, projectName}){
    const taskHolderNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "wrapper-task", "flow-y-bottom", "flex"]})
    const taskInfoItemsHolder = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "task__main-content", "flex", "flex-col"]})
    const taskTitleInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskHeadingText"], innerText: taskObj.getName()});
    const taskDescInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskDescription", "taskBaseText", "flow-y-bottom"], innerText: taskObj.getDescription()});
    const taskPriorityNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex"], innerText: "Priority: " + taskObj.getPriority().toUpperCase()});
    const taskDueDateNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex"], innerText: "Due Date: " + taskObj.getDueDate()});
    
    const taskDueInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-space-apart", "taskBaseText", "flow-bottom-y"]});
    taskDueInfoNode.appendChild(taskPriorityNode);
    taskDueInfoNode.appendChild(taskDueDateNode);

    const taskActionsNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-space-apart", "taskBaseText", "flow-bottom-y"]})
    const updateTaskActionNodes = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flow-bottom-y"]});
    const deleteTaskButton = ElementsHelper.createGenericElement({
        elementTagName: "button",
        innerText: "Delete Task", 
        clickEventCallBack: () => {
            pubsub.publish("deleteTaskIfPresent", taskObj);
            createTaskView(projectName);
        }, 
    })

    const editTaskButton = ElementsHelper.createGenericElement({
        elementTagName: "button",
        innerText: "Edit Task", 
        clickEventCallBack: () => {
            const newEditTask = renderEditableTask({taskObj, projectName});
            taskInfoItemsHolder.replaceChildren(newEditTask);
        }, 
    })

    updateTaskActionNodes.appendChild(editTaskButton);
    updateTaskActionNodes.appendChild(deleteTaskButton);

    const toggleTaskDoneButtonNode = createToggleTaskDoneButton(taskObj);
    let hideableNodes = [taskDescInfoNode, deleteTaskButton, editTaskButton, toggleTaskDoneButtonNode];
    hideableNodes.forEach(node => node.dataset.isHidden = "true");
    toggleTaskDoneButtonNode.dataset.isHidden = "false";
    const expandButtonNode = ElementsHelper.createGenericElement({
        elementTagName: "button",
        innerText: "Expand",
        clickEventCallBack: function() {
            hideableNodes.forEach(node => node.dataset.isHidden = node.dataset.isHidden === "true" ? "false" : "true");
            this.innerText = taskDescInfoNode.dataset.isHidden === "true" ? "Expand" : "Hide";
        }
    })

    taskActionsNode.appendChild(expandButtonNode);
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

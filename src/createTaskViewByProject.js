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

    const taskInfoItemsHolder = document.createElement("div");
    taskInfoItemsHolder.classList.add("wrapper", "task__main-content", "flex", "flex-col");

    const createTaskInfoItem = (innerText) => {
        const taskInfoItem = document.createElement("div");
        taskInfoItem.innerText = innerText;
        taskInfoItem.classList.add("flex", "flex-item-grow");

        return taskInfoItem;
    }
    const taskTitleInfoNode = createTaskInfoItem(taskObj.getName());
    taskTitleInfoNode.classList.add("taskHeadingText");
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
        button.classList.add("task__button");
        return button;
    }
    const updateTaskActionNodes = document.createElement("div");
    const deleteTaskButton = createButton("Delete Task", () => {
        pubsub.publish("deleteTaskIfPresent", taskObj);
        createTaskView(projectName);
    });
    const editTaskButton = createButton("Edit Task", () => {
        const newEditTask = renderEditableTask({taskObj, projectName});
        taskInfoItemsHolder.replaceChildren(newEditTask);
    });
    updateTaskActionNodes.appendChild(editTaskButton);
    updateTaskActionNodes.appendChild(deleteTaskButton);

    function renderEditableTask({taskObj, projectName}) {
        // take info out of the taskObj, return all of it as a form
        let taskInfoEditableItemsHolder = document.createElement("form");
        // taskInfoEditableItemsHolder.classList.add();
        const taskInfoItems = [taskObj.getName(), taskObj.getDescription(), taskObj.getDueDate(), taskObj.getPriority()];
        let taskInfoSetters = [taskObj.setName, taskObj.setDescription, taskObj.setDueDate, taskObj.setPriority];
        taskInfoSetters = taskInfoSetters.map(taskInfoSetter => taskInfoSetter.bind(taskObj));
        const taskInfoItemsFormObjectNames = ["name", "description", "dueDate", "priority", "projectName"];

        const taskInfoItemsFormInputs = [];
        for (let i = 0; i < taskInfoItems.length; i++) {
            const inputItem = document.createElement("input");
            inputItem.value = taskInfoItems[i];
            inputItem.type = "text";
            inputItem.name = taskInfoItemsFormObjectNames[i];
            inputItem.classList.add("taskEditInput");
            taskInfoItemsFormInputs.push(inputItem);
        }

        const saveButton = document.createElement("input");
        saveButton.type = "submit";
        saveButton.value = "Save";
        taskInfoEditableItemsHolder.replaceChildren(...taskInfoItemsFormInputs);
        taskInfoEditableItemsHolder.appendChild(saveButton);

        saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            const newTaskInfoFormData = new FormData(taskInfoEditableItemsHolder);
            const newTaskInfoFormDataValues = newTaskInfoFormData.values().toArray();
            // console.log(Object.fromEntries(newTaskInfoFormData.entries()))
            for (let i = 0; i < taskInfoSetters.length; i++) {
                console.log(newTaskInfoFormDataValues[i]);
                taskInfoSetters[i](newTaskInfoFormDataValues[i]);
            }
            createTaskView(projectName);
        })

        return taskInfoEditableItemsHolder;
    }

    const toggleTaskDoneButtonNode = createToggleTaskDoneButton();
    let hideableNodes = [taskDescInfoNode, deleteTaskButton, editTaskButton, toggleTaskDoneButtonNode];
    hideableNodes.forEach(node => node.dataset.isHidden = "true");
    toggleTaskDoneButtonNode.dataset.isHidden = "false";

    taskActionsNode.appendChild(createButton("Expand", function() {
        hideableNodes.forEach(node => node.dataset.isHidden = node.dataset.isHidden === "true" ? "false" : "true");
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

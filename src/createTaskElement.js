import { pubsub } from "./pubsub";
import createTaskView from "./createTaskViewByProject";
import ElementsHelper from "./ElementsHelper";
import createEditableTaskView from "./createEditableTaskView";

export default function createTaskElement({taskObj, projectName}){
    const taskHolderNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "wrapper-task", "flow-y-bottom", "flex"]})
    const taskInfoItemsHolder = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "task__main-content", "flex", "flex-col"]})
    const taskTitleInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskHeadingText"], innerText: taskObj.getName()});
    const taskDescInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskDescription", "taskBaseText", "flow-y-bottom"], innerText: taskObj.getDescription()});
    const taskPriorityNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex"], innerText: "Priority: " + taskObj.getPriority().toUpperCase()});
    const taskDueDateNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex"], innerText: "Due Date: " + taskObj.getDueDate()});
    
    const taskDueInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-space-apart", "taskBaseText", "flow-bottom-y"]});

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
            const newEditTask = createEditableTaskView({taskObj, projectName});
            taskInfoItemsHolder.replaceChildren(newEditTask);
        }, 
    })

    const toggleTaskDoneButtonNode = ElementsHelper.createGenericElement(
        {        
        elementTagName: "button",
        classList: ["task__button", "task__button_toDo"],
        clickEventCallBack: function() {
            this.dataset.isDone =  this.dataset.isDone === "true" ? "false" : "true";
            taskObj.toggleIsDone(this.dataset.isDone === "true");
        }}
    )
    
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

    taskDueInfoNode.replaceChildren(...[taskPriorityNode, taskDueDateNode]);
    updateTaskActionNodes.replaceChildren(...[editTaskButton, deleteTaskButton])
    taskActionsNode.replaceChildren(...[expandButtonNode, updateTaskActionNodes]);
    taskInfoItemsHolder.replaceChildren(...[taskTitleInfoNode, taskDueInfoNode, taskDescInfoNode, taskActionsNode]);
    taskHolderNode.replaceChildren(...[toggleTaskDoneButtonNode, taskInfoItemsHolder]);
    return taskHolderNode;
}
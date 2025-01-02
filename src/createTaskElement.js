import { pubsub } from "./pubsub";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ElementsHelper from "./ElementsHelper";
import createEditableTaskView from "./createEditableTaskView";

export default function createTaskElement({taskObj, projectName}){
    const taskHolderNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "wrapper-task", "flow-y-bottom", "flex"]})
    const taskInfoItemsHolder = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "task__main-content", "flex", "flex-col"]})
    const taskTitleInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskHeadingText"], innerText: taskObj.getName(), attributesMap: {"data-is-done": taskObj.getIsDone()}});
    const taskDescInfoNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-item-grow", "taskDescription", "taskBaseText", "flow-y-bottom"], innerText: taskObj.getDescription()});
    const taskPriorityNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "taskBaseText"], innerText: "Priority: " + taskObj.getPriority().toUpperCase()});
    const taskDueDateNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "taskBaseText"], innerText: "Due Date: " + taskObj.getDueDate(),  attributesMap: {"data-is-done": taskObj.getIsDone()}});
    
    const taskHeadingAndDueDateHolderNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-space-apart", "flow-bottom-y"]});
    const taskActionsHolderNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flex-space-apart", "taskBaseText", "flow-bottom-y"]})
    const updateTaskActionHolderNodes = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["flex", "flow-bottom-y",]});
    
    const deleteTaskButton = ElementsHelper.createGenericElement({
        elementTagName: "button",
        innerText: "Delete Task", 
        clickEventCallBack: () => {
            pubsub.publish("deleteTaskIfPresent", taskObj);
            CreateTaskViewByProject.createTaskView(projectName);
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
        attributesMap: {"data-is-done": taskObj.getIsDone() ? "true" : "false"},
        clickEventCallBack: function() {
            this.dataset.isDone =  taskObj.getIsDone() ? "false" : "true";
            taskObj.toggleIsDone(this.dataset.isDone === "true");
            CreateTaskViewByProject.createTaskView(projectName);
        }}
    )

    let hideableNodes = [taskDescInfoNode, deleteTaskButton, editTaskButton, toggleTaskDoneButtonNode, taskPriorityNode];
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

    updateTaskActionHolderNodes.replaceChildren(...[editTaskButton, deleteTaskButton])
    taskActionsHolderNode.replaceChildren(...[expandButtonNode, updateTaskActionHolderNodes]);
    taskInfoItemsHolder.replaceChildren(...[taskTitleInfoNode, taskDueDateNode,  taskPriorityNode, taskDescInfoNode, taskActionsHolderNode]);
    taskHolderNode.replaceChildren(...[toggleTaskDoneButtonNode, taskInfoItemsHolder]);
    return taskHolderNode;
}
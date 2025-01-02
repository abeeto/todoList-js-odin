import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ElementsHelper from "./ElementsHelper";
export default function createEditableTaskView({taskObj, projectName}) {
    // take info out of the taskObj, return all of it as a form
    let taskInfoEditableItemsHolder = ElementsHelper.createGenericElement({elementTagName: "form", classList: ["task-editable-form", "flex", "flex-col"]})
    // taskInfoEditableItemsHolder.classList.add();
    const taskInfoItems = [taskObj.getName(),   taskObj.getDueDate(), taskObj.getPriority(), taskObj.getDescription(),];
    let taskInfoSetters = [taskObj.setName, taskObj.setDueDate,  taskObj.setPriority, taskObj.setDescription,];
    taskInfoSetters = taskInfoSetters.map(taskInfoSetter => taskInfoSetter.bind(taskObj));
    const taskInfoItemsFormObjectNames = ["name", "dueDate", "priority", "description"];
    const taskInfoItemsIds = ["task-editable-name",  "task-editable-due-date", "task-editable-priority", "task-editable-description"];
    const taskInfoItemsElementTagName = ["input", "input", "input", "textarea"];
    const taskInfoItemsInputType = ["text", "date", "text", undefined];
    const taskInfoItemClassList = [["taskEditInput", "taskHeadingText"],  ["taskEditInput", "taskBaseText", "max-content-width"], ["taskEditInput", "taskBaseText", "max-content-width"], ["taskEditInput", "taskDescription", "taskBaseText", "flow-y-bottom"]]

    const taskInfoItemsFormInputs = [];
    for (let i = 0; i < taskInfoItems.length; i++) {
        const inputItem = ElementsHelper.createGenericElement({
            elementTagName: taskInfoItemsElementTagName[i],
            attributesMap: {"value": taskInfoItems[i], "id": taskInfoItemsIds[i], "type": taskInfoItemsInputType[i], "name": taskInfoItemsFormObjectNames[i]},
            classList: [...taskInfoItemClassList[i]]
        })
        taskInfoItemsFormInputs.push(inputItem);
    }
   taskInfoItemsFormInputs[3].innerText = taskObj.getDescription();

    const saveButton = ElementsHelper.createGenericElement({
        elementTagName: "input",
        attributesMap: {"value": "Save", "type": "submit"},
        classList: ["max-content-width"],
    })
    taskInfoEditableItemsHolder.replaceChildren(...taskInfoItemsFormInputs);
    taskInfoEditableItemsHolder.appendChild(saveButton);

    saveButton.addEventListener("click", (e) => {
        e.preventDefault();
        const newTaskInfoFormData = new FormData(taskInfoEditableItemsHolder);
        const newTaskInfoFormDataValues = newTaskInfoFormData.values().toArray();
        for (let i = 0; i < taskInfoSetters.length; i++) {
            console.log(newTaskInfoFormDataValues[i]);
            taskInfoSetters[i](newTaskInfoFormDataValues[i]);
        }
        CreateTaskViewByProject.createTaskView(projectName);
    })

    return taskInfoEditableItemsHolder;
}
import createTaskView from "./createTaskViewByProject";
import ElementsHelper from "./ElementsHelper";
export default function createEditableTaskView({taskObj, projectName}) {
    // take info out of the taskObj, return all of it as a form
    let taskInfoEditableItemsHolder = document.createElement("form");
    // taskInfoEditableItemsHolder.classList.add();
    const taskInfoItems = [taskObj.getName(), taskObj.getDescription(), taskObj.getDueDate(), taskObj.getPriority()];
    let taskInfoSetters = [taskObj.setName, taskObj.setDescription, taskObj.setDueDate, taskObj.setPriority];
    taskInfoSetters = taskInfoSetters.map(taskInfoSetter => taskInfoSetter.bind(taskObj));
    const taskInfoItemsFormObjectNames = ["name", "description", "dueDate", "priority", "projectName"];

    const taskInfoItemsFormInputs = [];
    for (let i = 0; i < taskInfoItems.length; i++) {
        const inputItem = ElementsHelper.createGenericElement({
            elementTagName: "input",
            attributesMap: {"value": taskInfoItems[i], "type": "text", "name": taskInfoItemsFormObjectNames[i]},
            classList: ["taskEditInput"]
        })
        taskInfoItemsFormInputs.push(inputItem);
    }

    const saveButton = ElementsHelper.createGenericElement({
        elementTagName: "input",
        attributesMap: {"value": "Save", "type": "submit"},
        classList: undefined,
    })
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
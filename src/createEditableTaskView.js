import createTaskView from "./createTaskViewByProject";
export default function renderEditableTask({taskObj, projectName}) {
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
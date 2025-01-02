import createTaskIntoProject from "./createTaskIntoProject";
import ElementsHelper from "./ElementsHelper";

export default function createTaskForm() {
    const formNode = ElementsHelper.createGenericElement({
        elementTagName: "form",
        attributesMap: {"id": "task-form"},
        classList: ["create-task-form", "flex", "flex-col", "flow-y-bottom"]
    })
      
    // const nameLabel = ElementsHelper.createLabelElement("name", "Name:");
    const nameInput = ElementsHelper.createGenericElement({elementTagName: "input",  classList: ["taskHeadingText", "taskEditInput"], attributesMap: {"placeholder": "Task Title", "type": "text", "name": "name"}, });

    // const descriptionLabel = ElementsHelper.createLabelElement("description", "Description:");
    const descriptionTextArea = ElementsHelper.createGenericElement({
        elementTagName: "textarea",
        attributesMap: {"name": "description", "id": "form-description", "placeholder": "Description/Instructions (optional)"},
        classList: ["taskEditInput", "taskDescription", "taskBaseText", "flow-y-bottom"],
    })

    // const dueDateLabel = ElementsHelper.createLabelElement("dueDate", "Due Date:");
    const dueDateInput = ElementsHelper.createGenericElement({elementTagName: "input",  classList: ["taskBaseText", "max-content-width"], attributesMap: {"name": "dueDate", "type": "date"}});

    // const priorityLabel = ElementsHelper.createLabelElement("priority", "Priority:");
    const priorityInput = ElementsHelper.createGenericElement({elementTagName: "input",  classList: ["taskBaseText", "taskEditInput"], attributesMap: {"placeholder": "Priority Level", "name": "priority"}, });

    // const projectSelectLabel = ElementsHelper.createLabelElement("projectName", "Project:");
    const projectSelectInput = ElementsHelper.createGenericElement({elementTagName: "input",  classList: ["taskBaseText", "taskEditInput"], attributesMap: {"placeholder": "Project Name", "name": "projectName"}, });

    const submitButton = ElementsHelper.createGenericElement({
        elementTagName: "input",
        attributesMap: {"type": "Submit", "value": "Create Task"},
    })
    formNode.replaceChildren(...[ nameInput, descriptionTextArea,  dueDateInput,  priorityInput,  projectSelectInput, submitButton]);
    formNode.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskIntoProject();
        formNode.childNodes.forEach(child => { 
            if (child.value != "Create Task") {
                child.value = "";
            }}
        );
    })
    return formNode;
}

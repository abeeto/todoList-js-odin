import createTaskIntoProject from "./createTaskIntoProject";
import ElementsHelper from "./ElementsHelper";

function createTaskForm() {
    const parentNode = ElementsHelper.createGenericElement({elementTagName: "div", classList: ["wrapper", "flow-y-bottom"]});

    const formNode = document.createElement("form");
    formNode.id = "task-form";
    parentNode.appendChild(formNode);
      
    const nameLabel = ElementsHelper.createLabelElement("name", "Name:");
    const nameInput = ElementsHelper.createInputElement({fieldName: "name", inputType: "text"});

    const descriptionLabel = ElementsHelper.createLabelElement("description", "Description:");
    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.setAttribute("name", "description");
    descriptionTextArea.setAttribute("id", "form-description");

    const dueDateLabel = ElementsHelper.createLabelElement("dueDate", "Due Date:");
    const dueDateInput = ElementsHelper.createInputElement({fieldName: "dueDate", inputType: "date"});

    const priorityLabel = ElementsHelper.createLabelElement("priority", "Priority:");
    const priorityInput = ElementsHelper.createInputElement({fieldName: "priority", inputType: "text"});

    const projectSelectLabel = ElementsHelper.createLabelElement("projectName", "Project:");
    const projectSelectInput = ElementsHelper.createInputElement({fieldName: "projectName", inputType: "text"});


    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    formNode.replaceChildren(...[ nameLabel, nameInput, descriptionLabel, descriptionTextArea, dueDateLabel, dueDateInput, priorityLabel, priorityInput, projectSelectLabel, projectSelectInput, submitButton]);

    formNode.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskIntoProject();
        formNode.childNodes.forEach(child => { 
            if (child.value != "Submit") {
                child.value = "";
            }}
        );
    })
    return parentNode;
}

export default createTaskForm();
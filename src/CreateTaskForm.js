import createTaskIntoProject from "./createTaskIntoProject";
// TODO: clean up
function createTaskForm() {
    const parentNode = document.createElement("div");
    // parentNode.classList.add("task-form-wrapper");
    
    const formNode = document.createElement("form");
    formNode.id = "task-form";
    parentNode.appendChild(formNode);
    const fieldsetNode = document.createElement("fieldset");
    fieldsetNode.innerText = "Create Task";

    const createInputNode = ({fieldName, inputType}) => {
        const inputNode = document.createElement("input");
        inputNode.setAttribute("type", inputType);
        inputNode.setAttribute("name", fieldName);
        inputNode.setAttribute("id", `form-${fieldName}`);
        return inputNode;
    }

    const createLabelNode = (fieldName, innerText) => {
        const labelNode = document.createElement("label");
        labelNode.setAttribute("for",  `form-${fieldName}`);
        labelNode.innerText = innerText;
        return labelNode;
    }
        
    const nameLabel = createLabelNode("name", "Name:");
    const nameInput = createInputNode({fieldName: "name", inputType: "text"});

    formNode.appendChild(nameLabel);
    formNode.appendChild(nameInput);

    const descriptionLabel = createLabelNode("description", "Description:");
    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.setAttribute("name", "description");
    descriptionTextArea.setAttribute("id", "form-description");

    formNode.appendChild(descriptionLabel);
    formNode.appendChild(descriptionTextArea);

    const dueDateLabel = createLabelNode("dueDate", "Due Date:");
    const dueDateInput = createInputNode({fieldName: "dueDate", inputType: "date"});

    formNode.appendChild(dueDateLabel);
    formNode.appendChild(dueDateInput);

    const priorityLabel = createLabelNode("priority", "Priority:");
    const priorityInput = createInputNode({fieldName: "priority", inputType: "text"});
    formNode.appendChild(priorityLabel);
    formNode.appendChild(priorityInput);

    const projectSelectLabel = createLabelNode("projectName", "Project:");
    const projectSelectInput = createInputNode({fieldName: "projectName", inputType: "text"});
    formNode.appendChild(projectSelectLabel);
    formNode.appendChild(projectSelectInput);

    const submitButton = document.createElement("input");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("value", "Submit");

    formNode.appendChild(submitButton);

    formNode.addEventListener("submit", (event) => {
        event.preventDefault();
        createTaskIntoProject();
    })
    return parentNode;
}

export default createTaskForm();
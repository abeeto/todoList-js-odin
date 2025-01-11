import createTaskIntoProject from "./createTaskIntoProject";
import ElementsHelper from "./ElementsHelper";

export default function createTaskForm() {
  const formNode = ElementsHelper.createGenericElement({
    elementTagName: "form",
    attributesMap: { id: "task-form" },
    classList: ["create-task-form", "flex", "flex-col", "flow-y-bottom"],
  });
  const nameInput = ElementsHelper.createGenericElement({
    elementTagName: "input",
    classList: ["taskHeadingText", "taskEditInput"],
    attributesMap: {
      placeholder: "Task Title",
      type: "text",
      name: "name",
      required: true,
    },
  });
  const descriptionTextArea = ElementsHelper.createGenericElement({
    elementTagName: "textarea",
    attributesMap: {
      name: "description",
      id: "form-description",
      placeholder: "Description/Instructions (optional)",
    },
    classList: [
      "taskEditInput",
      "taskDescription",
      "taskBaseText",
      "flow-y-bottom",
    ],
  });
  const dueDateInput = ElementsHelper.createGenericElement({
    elementTagName: "input",
    classList: ["taskBaseText", "max-content-width"],
    attributesMap: { name: "dueDate", type: "date", required: true },
  });
  const priorityInputOptions = ["high", "medium", "low"].map((priority) => {
    const optionToAdd = ElementsHelper.createGenericElement({
      elementTagName: "option",
      attributesMap: { value: priority },
      innerText: priority,
    });
    return optionToAdd;
  });
  const priorityInput = ElementsHelper.wrapElements({
    wrapperTag: "select",
    classList: ["taskBaseText", "taskEditInput"],
    attributesMap: { required: true },
    elementsToWrap: priorityInputOptions,
  });
  priorityInput.name = "priority";
  const projectSelectInput = ElementsHelper.createGenericElement({
    elementTagName: "input",
    classList: ["taskBaseText", "taskEditInput"],
    attributesMap: { placeholder: "Project Name", name: "projectName" },
  });

  const submitButton = ElementsHelper.createGenericElement({
    elementTagName: "input",
    attributesMap: { type: "Submit", value: "Create Task" },
  });

  formNode.replaceChildren(
    ...[
      nameInput,
      descriptionTextArea,
      dueDateInput,
      priorityInput,
      projectSelectInput,
      submitButton,
    ],
  );
  formNode.addEventListener("submit", (event) => {
    event.preventDefault();
    createTaskIntoProject();
    formNode.childNodes.forEach((child) => {
      if (child.value != "Create Task") {
        child.value = "";
      }
    });
  });
  return formNode;
}

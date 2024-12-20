import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
const bodyNode = document.querySelector("body");

bodyNode.appendChild(CreateTaskForm);
bodyNode.appendChild(projectTabHolderNode);
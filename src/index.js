import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
import './style.css';

const bodyNode = document.querySelector("body");
bodyNode.appendChild(CreateTaskForm);
bodyNode.appendChild(projectTabHolderNode);

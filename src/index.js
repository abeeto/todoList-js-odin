import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
import './style.css';

const bodyNode = document.querySelector("body");
const mainWrapperNode = document.createElement("div");
mainWrapperNode.classList.add("main-wrapper");

mainWrapperNode.appendChild(CreateTaskForm);
mainWrapperNode.appendChild(projectTabHolderNode);

bodyNode.appendChild(mainWrapperNode);
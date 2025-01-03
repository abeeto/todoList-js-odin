import projectTabHolderNode from "./createProjectTabs";
import taskButton from "./taskButton";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import "./style.css";

const bodyNode = document.querySelector("body");
const mainWrapperNode = document.createElement("div");
mainWrapperNode.classList.add("wrapper");

const taskHolderNode = CreateTaskViewByProject.getTaskViewHolderNode();

mainWrapperNode.appendChild(projectTabHolderNode);
mainWrapperNode.appendChild(taskHolderNode);
mainWrapperNode.appendChild(taskButton);

bodyNode.appendChild(mainWrapperNode);

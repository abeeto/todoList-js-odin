import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
import { pubsub } from "./pubsub";
import { renderTasks } from "./createTaskViewByProject";
import './style.css';

const bodyNode = document.querySelector("body");
const mainWrapperNode = document.createElement("div");
mainWrapperNode.classList.add("main-wrapper");

mainWrapperNode.appendChild(CreateTaskForm);
mainWrapperNode.appendChild(projectTabHolderNode);

bodyNode.appendChild(mainWrapperNode);

pubsub.publish("potentialNewProject", "All Projects")
renderTasks("All Projects");

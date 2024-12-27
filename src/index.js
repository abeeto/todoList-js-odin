import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
import { pubsub } from "./pubsub";
import { renderTasks } from "./createTaskViewByProject";
import './style.css';

const bodyNode = document.querySelector("body");

pubsub.publish("potentialNewProject", "All Projects")

bodyNode.appendChild(CreateTaskForm);
bodyNode.appendChild(projectTabHolderNode);

renderTasks("All Projects");

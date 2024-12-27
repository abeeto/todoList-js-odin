import CreateTaskForm from "./CreateTaskForm";
import projectTabHolderNode from "./createProjectTabs";
import { pubsub } from "./pubsub";
import { renderTasks } from "./createTaskViewByProject";
import './style.css';

const bodyNode = document.querySelector("body");
bodyNode.appendChild(CreateTaskForm);
bodyNode.appendChild(projectTabHolderNode);

pubsub.publish("potentialNewProject", "All Projects")
renderTasks("All Projects");

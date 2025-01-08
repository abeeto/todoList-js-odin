import taskButton from "./taskButton";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ProjectsList from "./ProjectsList";
import projectTabs from "./createProjectTabs";
import "./style.css";

const bodyNode = document.querySelector("body");
const mainWrapperNode = document.createElement("div");
mainWrapperNode.classList.add("wrapper");

const taskHolderNode = CreateTaskViewByProject.getTaskViewHolderNode();
const projectTabHolderNode = projectTabs.createProjectTabs();
if (localStorage.getItem("projectsList")) {
  ProjectsList.setProjectObjectsFromLocalStorage();
  CreateTaskViewByProject.createTaskView("All Projects");
  projectTabs.renderProjectTabs();
}

mainWrapperNode.appendChild(projectTabHolderNode);
mainWrapperNode.appendChild(taskHolderNode);
mainWrapperNode.appendChild(taskButton);

bodyNode.appendChild(mainWrapperNode);

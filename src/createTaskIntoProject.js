import ProjectsList from "./ProjectsList";
import Task  from "./Task";
import { pubsub } from "./pubsub";
import createTaskView from "./createTaskViewByProject";
import handleActiveProject from "./activeProject";

export default function createTaskIntoProject() {
    const form = document.querySelector("#task-form");
    const formDataObject= new FormData(form);

    const taskUserValuesObject = Object.fromEntries(formDataObject.entries());
    let {projectName} = Object.fromEntries(formDataObject.entries());
    const taskObj= new Task(taskUserValuesObject);
    if (projectName === "") {
        projectName = "All Projects";
    }
    if (ProjectsList.isEmpty()) {
        pubsub.publish("potentialNewProject", "All Projects");
    }
    pubsub.publish("potentialNewProject", projectName);
    pubsub.publish("addTaskToProject", {taskObj, projectName});
    pubsub.publish("addTaskToProject", {taskObj, projectName: "All Projects"});
    createTaskView(projectName);

    const projectTabsHolderNode = document.querySelector(".project-tabs-wrapper");
    const allProjects = Array.from(projectTabsHolderNode.children)
    const rightProjectTab = allProjects.filter((child) => child.dataset.projectName === projectName);
    console.log(rightProjectTab);
    handleActiveProject(...rightProjectTab);
}
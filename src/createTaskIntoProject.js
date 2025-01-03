import ProjectsList from "./ProjectsList";
import Task  from "./Task";
import { pubsub } from "./pubsub";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ActiveProject from "./ActiveProject";

export default function createTaskIntoProject() {
    const form = document.querySelector("#task-form");
    const formDataObject= new FormData(form);

    const taskUserValuesObject = Object.fromEntries(formDataObject.entries());
    console.log(taskUserValuesObject);
    let {projectName} = Object.fromEntries(formDataObject.entries());
    const taskObj= new Task(taskUserValuesObject);
    if (projectName === "") {
        projectName = ActiveProject.getActiveProject();
    }
    if (ProjectsList.isEmpty()) {
        pubsub.publish("potentialNewProject", "All Projects");
    }
    pubsub.publish("potentialNewProject", projectName);
    pubsub.publish("addTaskToProject", {taskObj, projectName});
    pubsub.publish("addTaskToProject", {taskObj, projectName: "All Projects"});
    CreateTaskViewByProject.createTaskView(projectName);

    const projectTabsHolderNode = document.querySelector("#project-tabs-wrapper");
    const allProjects = Array.from(projectTabsHolderNode.children)
    const rightProjectTab = allProjects.filter((child) => child.dataset.projectName === projectName);
    console.log(rightProjectTab);
    ActiveProject.newActiveProject(...rightProjectTab);
}
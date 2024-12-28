import ProjectsList from "./ProjectsList";
import Task  from "./Task";
import { pubsub } from "./pubsub";
import createTaskView from "./createTaskViewByProject";
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
}
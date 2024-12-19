import Task  from "./Task";
import Project from "./Project";
import { pubsub } from "./pubsub";

export default function createTaskIntoProject() {
    const form = document.querySelector("#task-form");
    const formDataObject= new FormData(form);

    const taskUserValuesObject = Object.fromEntries(formDataObject.entries());
    const {projectName} = Object.fromEntries(formDataObject.entries());
    const taskObject = new Task(taskUserValuesObject);
    // TODO: Insert into existing or new project.
    const newProject = new Project(projectName);
    pubsub.publish("createTaskToProject", {taskObject, projectName});
    // TODO: make project subscribe to the task
}
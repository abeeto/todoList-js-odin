import Task  from "./Task";
import { pubsub } from "./pubsub";

export default function createTaskIntoProject() {
    const form = document.querySelector("#task-form");
    const formDataObject= new FormData(form);

    const taskUserValuesObject = Object.fromEntries(formDataObject.entries());
    const {projectName} = Object.fromEntries(formDataObject.entries());
    const taskObject = new Task(taskUserValuesObject);
    
    pubsub.publish("potentialNewProject", projectName);
    pubsub.publish("createTaskToProject", {taskObject, projectName});
}
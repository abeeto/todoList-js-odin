import { Task } from "./Task";
export default function createTask() {
    const form = document.querySelector("#task-form");
    const formDataObject = new FormData(form);

    const taskData = Object.fromEntries(formDataObject.entries());

    const newTask = new Task(taskData);
    console.log(newTask.toString());
    form.reset();

    return newTask;
}
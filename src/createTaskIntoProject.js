import ProjectsList from "./ProjectsList";
import Task from "./Task";
import { pubsub } from "./pubsub";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ActiveProject from "./ActiveProject";
import TaskList from "./TaskList";

export default function createTaskIntoProject() {
  const form = document.querySelector("#task-form");
  const formDataObject = new FormData(form);

  const taskUserValuesObject = Object.fromEntries(formDataObject.entries());
  let { projectName } = Object.fromEntries(formDataObject.entries());
  const taskObj = new Task(taskUserValuesObject);
  pubsub.publish("taskCreated", taskObj);

  const taskId = TaskList.getIdByTask(taskObj);
  if (projectName === "") {
    projectName = ActiveProject.getActiveProject() || "All Projects";
  }
  if (ProjectsList.isEmpty()) {
    pubsub.publish("potentialNewProject", "All Projects");
  }
  pubsub.publish("potentialNewProject", projectName);
  pubsub.publish("addTaskToProject", {
    taskId: taskId,
    projectName: projectName,
  });
  pubsub.publish("addTaskToProject", {
    taskId: taskId,
    projectName: "All Projects",
  });
  CreateTaskViewByProject.createTaskView(projectName);

  const projectTabsHolderNode = document.querySelector("#project-tabs-wrapper");
  const allProjects = Array.from(projectTabsHolderNode.children);
  let rightProjectTab = allProjects.filter(
    (child) => child.dataset.projectName === projectName,
  );
  ActiveProject.newActiveProject(...rightProjectTab);
}

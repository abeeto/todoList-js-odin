import Project from "./Project";
import { pubsub } from "./pubsub";
import Task from "./Task";

const ProjectsList = function () {
  const projectObjects = {};
  const getProjectsObjectsCopy = () => {
    // deep copy of projectObjects
    return JSON.parse(JSON.stringify(projectObjects));
  };
  const getAllNamesOfProjects = () => Object.keys(projectObjects);

  const getAllTasksOfProject = (name) => projectObjects[name].getAllTasks();

  function addTaskToProject({ taskObj, projectName }) {
    projectObjects[projectName].addTask(taskObj);
    updateLocalStorageProjectsList();
  }

  const createProjectIfNewName = function (name) {
    if (projectObjects[name] === undefined) {
      console.log("This is a new name!");
      projectObjects[name] = new Project(name);
    }
  };

  const setProjectObjectsFromLocalStorage = () => {
    const taskIdByProjectObject = JSON.parse(
      localStorage.getItem("projectsList"),
    );
    for (const [key, value] of Object.entries(taskIdByProjectObject)) {
      createProjectIfNewName(key);
      console.log(projectObjects);
      const taskIdArray = value;
      taskIdArray.forEach((taskId) => {
        const taskObjData = JSON.parse(localStorage.getItem(taskId));
        addTaskToProject({ taskObj: new Task(taskObjData), projectName: key });
      });
    }
  };
  const updateLocalStorageProjectsList = () => {
    let newProjectList = {};
    for (let projectName of Object.keys(projectObjects)) {
      newProjectList[projectName] = projectObjects[projectName].getAllTaskIds();
    }
    localStorage.setItem("projectsList", JSON.stringify(newProjectList));
  };

  const isEmpty = () => Object.keys(projectObjects).length === 0;
  pubsub.subscribe("potentialNewProject", createProjectIfNewName);
  pubsub.subscribe("addTaskToProject", addTaskToProject);

  return {
    getProjectsObjectsCopy,
    getAllNamesOfProjects,
    getAllTasksOfProject,
    isEmpty,
    updateLocalStorageProjectsList,
    setProjectObjectsFromLocalStorage,
  };
};

export default new ProjectsList();

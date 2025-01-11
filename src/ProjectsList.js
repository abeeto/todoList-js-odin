import Project from "./Project";
import { pubsub } from "./pubsub";

const ProjectsList = function () {
  const projectObjects = {};
  const getProjectsObjectsCopy = () => {
    // deep copy of projectObjects
    return JSON.parse(JSON.stringify(projectObjects));
  };
  const getAllNamesOfProjects = () => Object.keys(projectObjects);

  const getAllTaskIdsOfProject = (name) => projectObjects[name].getAllTaskIds();
  const setAllTaskIdsOfProject = ({ name, taskIdList }) =>
    projectObjects[name].setAllTaskIds(taskIdList);
  function addTaskIdToProject({ taskId, projectName }) {
    projectObjects[projectName].addTaskId(taskId);
    updateLocalStorageProjectsList();
  }

  const createProjectIfNewName = function (name) {
    if (projectObjects[name] === undefined) {
      projectObjects[name] = new Project(name);
    }
  };

  const setProjectObjectsFromLocalStorage = () => {
    const taskIdByProjectObject = JSON.parse(
      localStorage.getItem("projectsList"),
    );
    for (const [key, value] of Object.entries(taskIdByProjectObject)) {
      createProjectIfNewName(key);
      const taskIdArray = value;
      taskIdArray.forEach((taskId) => {
        addTaskIdToProject({ taskId: taskId, projectName: key });
      });
    }
  };
  const updateLocalStorageProjectsList = () => {
    let newProjectList = {};
    for (let [projectName, project] of Object.entries(projectObjects)) {
      console.log(project.getAllTaskIds());
      newProjectList[projectName] = project.getAllTaskIds();
    }
    localStorage.setItem("projectsList", JSON.stringify(newProjectList));
  };

  const isEmpty = () => Object.keys(projectObjects).length === 0;
  pubsub.subscribe("potentialNewProject", createProjectIfNewName);
  pubsub.subscribe("projectHasDeletedTask", updateLocalStorageProjectsList);
  pubsub.subscribe("addTaskToProject", addTaskIdToProject);

  return {
    getProjectsObjectsCopy,
    getAllNamesOfProjects,
    getAllTaskIdsOfProject,
    setAllTaskIdsOfProject,
    isEmpty,
    updateLocalStorageProjectsList,
    setProjectObjectsFromLocalStorage,
  };
};

export default new ProjectsList();

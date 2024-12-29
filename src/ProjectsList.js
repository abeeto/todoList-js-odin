import Project from "./Project"
import { pubsub } from "./pubsub"

const ProjectsList = function() {
    const projectObjects = {};
    const getProjectsObjectsCopy = () => {
        // deep copy of projectObjects
        return JSON.parse(JSON.stringify(projectObjects))
    }
    const getAllNamesOfProjects = () => Object.keys(projectObjects);
    
    const getAllTasksOfProject = (name) => projectObjects[name].getAllTasks();

    const addTaskToProject = ({taskObj, projectName}) => {
        projectObjects[projectName].addTask(taskObj)
    };
    const createProjectIfNewName = function(name) { 
        if (projectObjects[name] === undefined) {
            console.log("This is a new name!");
            projectObjects[name] = new Project(name);
        } 
    }
    const isEmpty = () => Object.keys(projectObjects).length === 0;
    pubsub.subscribe("potentialNewProject", createProjectIfNewName);
    pubsub.subscribe("addTaskToProject", addTaskToProject);

    return {getProjectsObjectsCopy, getAllNamesOfProjects, getAllTasksOfProject, isEmpty}
}

export default new ProjectsList();
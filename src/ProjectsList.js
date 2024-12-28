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
    
    const createProjectIfNewName = function(name) { 
        if (projectObjects[name] === undefined) {
            console.log("This is a new name!");
            projectObjects[name] = new Project(name);
        } 
    }
    pubsub.subscribe("potentialNewProject", createProjectIfNewName);
    return {getProjectsObjectsCopy, getAllNamesOfProjects, getAllTasksOfProject}
}

export default new ProjectsList();
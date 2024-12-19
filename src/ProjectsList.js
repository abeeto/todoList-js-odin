import Project from "./Project"
const ProjectsList = function() {
    const projectObjects = {};

    const createProjectIfNewName = function(name) { 
        if (projectObjects[name] === undefined) {
            projectObjects[name] = new Project(name);
        } 
    }

    const getProjectsObjects = () => {
        return JSON.parse(JSON.stringify(projectObjects))
    }

   return {createProjectIfNewName, getProjectsObjects}
}

export default new ProjectsList();
import projects from "./ProjectsList";
import { pubsub } from "./pubsub";
import createTaskView from './createTaskViewByProject';

function createProjectTabs() {
    const projectTabHolderNode = document.createElement("div");
    projectTabHolderNode.classList.add("project-tabs-wrapper");
    projectTabHolderNode.addEventListener("click", (e) => {
        const projectName = e.target.innerText;
        createTaskView(projectName);
    });

    const renderProjectTab = (name) => {
        const projectTab = document.createElement("div");
        projectTab.classList.add("project-tab");
        projectTab.innerText = name;
        return projectTab;
    }

    const renderProjectTabs = () => {
        const allProjectNames = projects.getAllNamesOfProjects();
        const projectTabs = allProjectNames.map(name => renderProjectTab(name));
        projectTabHolderNode.replaceChildren(...projectTabs);
    }

    pubsub.subscribe("potentialNewProject", renderProjectTabs);
    return projectTabHolderNode;
}


export default createProjectTabs();
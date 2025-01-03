import projects from "./ProjectsList";
import { pubsub } from "./pubsub";
import CreateTaskViewByProject from './CreateTaskViewByProject';
import ActiveProject from "./ActiveProject";
import ElementsHelper from "./ElementsHelper";

function createProjectTabs() {
    const projectTabHolderNode = document.createElement("div");
    projectTabHolderNode.classList.add("wrapper", "wrapper-projects", "flow-y-bottom");
    projectTabHolderNode.id = "project-tabs-wrapper";
    projectTabHolderNode.addEventListener("click", (e) => {
        const projectName = e.target.innerText;
        ActiveProject.newActiveProject(e.target);
        CreateTaskViewByProject.createTaskView(projectName);
    });

    const renderProjectTab = (name) => {
        const projectTab = ElementsHelper.createGenericElement({
            elementTagName: "div",
            innerText: name,
            attributesMap: {"data-project-name": name},
        })
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
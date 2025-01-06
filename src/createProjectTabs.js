import projects from "./ProjectsList";
import { pubsub } from "./pubsub";
import CreateTaskViewByProject from "./CreateTaskViewByProject";
import ActiveProject from "./ActiveProject";
import ElementsHelper from "./ElementsHelper";

const projectTabHolderNode = document.createElement("div");

const renderProjectTab = (name) => {
  const projectTab = ElementsHelper.createGenericElement({
    elementTagName: "div",
    innerText: name,
    attributesMap: { "data-project-name": name },
    clickEventCallBack: (e) => {
      const projectName = e.target.innerText;
      ActiveProject.newActiveProject(e.target);
      CreateTaskViewByProject.createTaskView(projectName);
    },
  });
  return projectTab;
};

const renderProjectTabs = () => {
  const allProjectNames = projects.getAllNamesOfProjects();
  if (allProjectNames.length === 0) {
    projectTabHolderNode.appendChild(
      ElementsHelper.createGenericElement({
        elementTagName: "div",
        innerText: "No Projects Yet",
        classList: ["empty-project-note"],
      }),
    );
  } else {
    const projectTabs = allProjectNames.map((name) => renderProjectTab(name));
    projectTabHolderNode.replaceChildren(...projectTabs);
  }
};

function createProjectTabs() {
  projectTabHolderNode.classList.add(
    "wrapper",
    "wrapper-projects",
    "flow-y-bottom",
  );
  projectTabHolderNode.id = "project-tabs-wrapper";
  pubsub.subscribe("potentialNewProject", renderProjectTabs);
  renderProjectTabs();
  return projectTabHolderNode;
}

export default createProjectTabs();

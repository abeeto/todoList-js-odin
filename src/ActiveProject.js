
let activeProjectHolder = [];

function newActiveProject(projectNode) {
    let previousProjectNode = activeProjectHolder.pop();
    console.log(previousProjectNode);
    if (projectNode) {
        activeProjectHolder.push(projectNode);
    }
    previousProjectNode?.classList.remove("active-project");
    activeProjectHolder[0].classList.add("active-project");
}

function getActiveProject() {
    if (activeProjectHolder.length > 0) return activeProjectHolder[0].innerText;
}

export default {newActiveProject, getActiveProject};
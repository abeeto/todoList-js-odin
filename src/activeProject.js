
let activeProjectHolder = [];

export default function handleActiveProject(projectNode) {
    let previousProjectNode = activeProjectHolder.pop();
    console.log(previousProjectNode);
    if ( previousProjectNode !== projectNode ) {
        activeProjectHolder.push(projectNode);
    }
    previousProjectNode?.classList.remove("active-project");
    activeProjectHolder[0].classList.add("active-project");
}



function Broadcast() {
    const relayTaskCreated = (id) => {
        console.log(`Task has been created. ID: ${id}`);
    }

    const instructProjectToAdd = (project, task) => {
        console.log(`Hey, ${project}, you should add the task: ${task}`)
    }

    return {relayTaskCreated, instructProjectToAdd};
}

export default Broadcast();

const TaskList = {};

const addTaskToDictionary = ({ id, taskObj }) => {
  TaskList[id] = taskObj;
};

const getTaskById = (id) => {
  return TaskList[id];
};

export default { addTaskToDictionary, getTaskById };

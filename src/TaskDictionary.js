const TaskDictionary = {};

const addTaskToDictionary = ({ id, taskObj }) => {
  TaskDictionary[id] = taskObj;
};

const getTaskById = (id) => {
  return TaskDictionary[id];
};



export default { addTaskToDictionary, getTaskById };

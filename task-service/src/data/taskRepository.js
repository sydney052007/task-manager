const tasks = [];

function getAllTasks() {
  return tasks;
}

function createTask(task) {
  tasks.push(task);
  return task;
}

function updateTask(id, updates) {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;
  Object.assign(task, updates);
  return task;
}

module.exports = { getAllTasks, createTask, updateTask };
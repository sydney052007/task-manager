const { getAllTasks, createTask, updateTask } = require('../data/taskRepository');

function getTasks() {
  return getAllTasks();
}

function addTask(content, deadline) {
  if (!content) {
    throw new Error('content 是必填欄位');
  }
  if (!deadline) {
    throw new Error('deadline 是必填欄位');
  }

  const createDate = new Date();
  const deadlineDate = new Date(deadline);

  if (deadlineDate <= createDate) {
    throw new Error('deadline 必須在建立時間之後');
  }

  const task = {
    id: Date.now().toString(),
    content,
    deadline,
    createDate: createDate.toISOString(),
    done: false,
  };

  return createTask(task);
}

function completeTask(id) {
  const result = updateTask(id, { done: true });
  if (!result) {
    throw new Error('找不到這個 task');
  }
  return result;
}

module.exports = { getTasks, addTask, completeTask };
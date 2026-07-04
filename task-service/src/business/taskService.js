const { getAllTasks, createTask, updateTask } = require('../data/taskRepository');

function getTasks() {
  return getAllTasks();
}

function addTask(userId, content, deadline) {
  if (!userId) {
    throw new Error('userId 是必填欄位');
  }
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
    userId,
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

function getUpcomingTasks() {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 將時間設為今天的開始

  const threeDaysLater = new Date(today);
  threeDaysLater.setDate(today.getDate() + 3); // 設定為三天後

  return getAllTasks().filter(task => {
    const deadline = new Date(task.deadline);
    return deadline >= today && deadline <= threeDaysLater;
  });
}

module.exports = { getTasks, addTask, completeTask, getUpcomingTasks };
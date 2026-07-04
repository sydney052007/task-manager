const express = require('express');
const router = express.Router();
const { getTasks, addTask, completeTask , getUpcomingTasks } = require('../business/taskService');

router.get('/tasks', (req, res) => {
  const tasks = getTasks();
  res.status(200).json(tasks);
});

router.post('/tasks', (req, res) => {
  try {
    const { userId,content, deadline } = req.body;
    const task = addTask(userId, content, deadline);
    
    fetch('http://localhost:3003/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId:task.userId, taskId:task.id })
    }).catch(err => console.error('通知 Notification Service 失敗:', err));
    
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/tasks/:id', (req, res) => {
  try {
    const task = completeTask(req.params.id);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/tasks/upcoming', (req, res) => {
  const upcomingTasks = getUpcomingTasks();
  res.status(200).json(upcomingTasks);
});

module.exports = router;
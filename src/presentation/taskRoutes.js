const express = require('express');
const router = express.Router();
const { getTasks, addTask, completeTask } = require('../business/taskService');

router.get('/tasks', (req, res) => {
  const tasks = getTasks();
  res.status(200).json(tasks);
});

router.post('/tasks', (req, res) => {
  try {
    const { content, deadline } = req.body;
    const task = addTask(content, deadline);
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

module.exports = router;
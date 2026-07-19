const express = require('express');
const router = express.Router();
const { addUser, getUser } = require('../business/userService');

router.post('/users', (req, res) => {
  try {
    const { email } = req.body;
    const user = addUser(email);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  } 
});

router.get('/users/:id', (req, res) => {
  try {
    const user = getUser(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
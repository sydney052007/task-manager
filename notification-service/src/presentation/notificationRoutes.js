const express = require('express');
const router = express.Router();
const { handleNotify } = require('../business/notificationService');

router.post('/notify', async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const record = await handleNotify(userId, taskId);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
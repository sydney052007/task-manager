const express = require('express');
const router = express.Router();
const { handleNotify, checkAndNotify } = require('../business/notificationService');

router.post('/notify', async (req, res) => {
    try {
        const { userId, taskId } = req.body;
        const record = await handleNotify(userId, taskId);
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.post('/test-notify', async (req, res) => {
    try {
        await checkAndNotify();
        res.status(200).json({ message: '通知檢查已觸發' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
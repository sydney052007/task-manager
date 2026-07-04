const crypto = require('crypto');
const { createRecord } = require('../data/notificationRepository');

async function handleNotify(userId, taskId) {
    const response = await fetch(`http://localhost:3002/users/${userId}`);

    if (!response.ok) {
        throw new Error('找不到這個 user');
    }

    const user = await response.json();

    const record = {
        id: crypto.randomUUID(),
        userId,
        taskId,
        email: user.email,
        sentAt: new Date().toISOString(),
    };

    createRecord(record);
    console.log(`通知已發送給 ${user.email}`);

    return record;
}

module.exports = { handleNotify };
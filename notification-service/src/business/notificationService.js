const crypto = require('crypto');
const { createRecord } = require('../data/notificationRepository');
const nodemailer = require('nodemailer');
require('dotenv').config();

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function checkAndNotify(){
    try {
        let upcomingTasks = null;
        for (let i = 0; i < 3; i++) {
            try {
                const response = await fetch('http://localhost:3001/tasks/upcoming');
                if (!response.ok) {
                    throw new Error('無法取得即將到期的任務');
                }
                upcomingTasks = await response.json();
                break; // 成功取得資料，跳出迴圈
            } catch (error) {
                console.error(`第 ${i + 1} 次嘗試失敗:`, error);
                if (i === 2) {
                    throw new Error('連續三次嘗試後仍無法取得即將到期的任務');
                }
            }
        }
        
        const grouped = {};
        for (const task of upcomingTasks) {
            if (!grouped[task.userId]) {
                grouped[task.userId] = [];
            }
            grouped[task.userId].push(task);
        }
        
        for(const [userId, tasks] of Object.entries(grouped)) {
            try {
                const email = (await (await fetch(`http://localhost:3002/users/${userId}`)).json()).email;
                const taskList = tasks.map(task => `- ${task.content} (截止日期: ${task.deadline})`).join('\n');
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: '即將到期的任務提醒',
                    text: `您有以下任務即將到期:\n\n${taskList}`,
                };
                await transporter.sendMail(mailOptions);
            } catch (error) {
                console.error(`處理 userId ${userId} 的通知時發生錯誤:`, error);
            }
        }
    } catch (error) {
        console.error('檢查和通知時發生錯誤:', error);
    }
}

module.exports = { handleNotify, checkAndNotify };
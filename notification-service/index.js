const express = require('express');
const notificationRoutes = require('./src/presentation/notificationRoutes');
const cron = require('node-cron');
require('dotenv').config();
const { checkAndNotify } = require('./src/business/notificationService');

cron.schedule('0 0 7 * * *', () => {
  checkAndNotify();
});

const app = express();
app.use(express.json());
app.use(notificationRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
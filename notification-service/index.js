const express = require('express');
const notificationRoutes = require('./src/presentation/notificationRoutes');

const app = express();
app.use(express.json());
app.use(notificationRoutes);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
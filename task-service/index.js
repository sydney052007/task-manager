const express = require('express');
const taskRoutes = require('./src/presentation/taskRoutes');

const app = express();
app.use(express.json());
app.use(taskRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
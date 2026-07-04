const express = require('express');
const userRoutes = require('./src/presentation/userRoutes');

const app = express();
app.use(express.json());
app.use(userRoutes);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
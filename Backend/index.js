const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const port = 3000;
const transactionRoutes = require('./Routes/transactionRoutes');
app.use(express.urlencoded({ extended: true }));
app.use('/api', transactionRoutes);

app.listen(port, () => {
  console.log(`the server is running on port ${port}`);
});
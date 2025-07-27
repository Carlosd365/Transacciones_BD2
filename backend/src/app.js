const express = require('express');
const cors = require('cors');
const app = express();
const transactionRoutes = require('./routes/transactionRoutes');

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));

app.use(express.json());
app.use('/api', transactionRoutes);

module.exports = app;

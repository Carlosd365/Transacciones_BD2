require('dotenv').config();
const express = require('express');
const cors = require('cors');
const transactionRoutes = require('./src/routes/transactionRoutes');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors({ origin: ['http://localhost:3000','http://localhost:3001'] }));

app.use(express.json());

app.use('/api', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

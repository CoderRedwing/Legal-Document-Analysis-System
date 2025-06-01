const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const documentRoutes = require('./routes/documentRoutes');
const connectDb = require('./config/db');
const app = express();

dotenv.config();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'https://legal-document-analysis-system.vercel.app'],          
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], 
  credentials: true                         
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/docs', documentRoutes);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

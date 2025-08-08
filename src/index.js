const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(cors(
  'origin: http://localhost:3000',
  'methods: GET,HEAD,PUT,PATCH,POST,DELETE',
  'allowedHeaders: Content-Type, Authorization'
));
app.use(express.json());

// Route placeholders
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

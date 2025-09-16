require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db');

const authRoutes = require('./routes/auth.routes');

connectDB();
app.use(express.json());



app.use('/api/auth', authRoutes);

module.exports = app;
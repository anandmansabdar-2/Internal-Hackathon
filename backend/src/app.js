require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');

connectDB();
app.use(express.json());



app.use('/api/auth', authRoutes);

app.use("/api/admin", adminRoutes);

module.exports = app;
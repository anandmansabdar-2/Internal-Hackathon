require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./db/db');
const cors = require('cors')

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const mediaRoutes = require('./routes/media.routes');
const reportRoutes = require('./routes/report.routes');


connectDB();
app.use(cors())
app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/media', mediaRoutes);
app.use("/api/reports", reportRoutes);



module.exports = app;
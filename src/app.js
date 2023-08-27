const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('./db/mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require('./routes/user');
const repoRoutes = require('./routes/repo');
const adminRoutes = require('./routes/admin');

// Routes
app.use('/users', userRouter);
app.use('/repos', repoRoutes);
app.use(adminRoutes);

module.exports = app;
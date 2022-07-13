const express = require('express');
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();

// load up express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// Routes for /api/goals
app.use('/api/goals', require('./routes/goalRoutes'));
// Routes for users
app.use('/api/users/', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
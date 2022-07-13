const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
require('dotenv').config();

const port = process.env.PORT || 5000;

// load up express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(errorHandler);

// Routes for /api/goals
app.use('/api/goals', require('./routes/goalRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
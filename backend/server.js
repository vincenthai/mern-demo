const express = require('express');
const path = require('path');
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

// Routes for users
app.use('/api/users/', require('./routes/userRoutes'));
// Routes for nail polishes
app.use('/api/nail-polish', require('./routes/nailPolishRoutes'));
// Routes for patterns
app.use('/api/patterns', require('./routes/patternRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')));
}
else {
    app.get('/', (req, res) => res.send('Please set to production'));
}

app.listen(port, () => console.log(`Server started on port ${port}`));
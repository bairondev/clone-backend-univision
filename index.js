const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// create server
const app = express();

// Connect db
connectDB();

// load cors
app.use(cors());

app.use( express.json({ extended: true }));

// App Port
const port = process.env.PORT || 4000;

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/videos', require('./routes/videos'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Univision Server ${port}`);
});
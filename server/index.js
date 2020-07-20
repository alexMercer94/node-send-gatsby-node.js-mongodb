const express = require('express');
const connectDB = require('./config/db');

//Create server
const app = express();

// Connect db
connectDB();

// App port
const port = process.env.PORT || 4000;

// Enable read body's values
app.use(express.json());

// Rounting
app.use('/api/users', require('./routes/users'));

app.listen(port, '0.0.0.0', () => {
    console.log(`Server started on port ${port}`);
});

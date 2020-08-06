const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

//Define Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/users', require('./routes/users'));

//Set port
const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

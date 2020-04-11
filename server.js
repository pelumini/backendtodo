const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const {mongourl, port} = require('./config/keys');

// Connect to MongoDB with mongoose
mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.on('connected', () => console.log('MongoDB Database connection established successfully!'));
connection.on('error', (err) => console.log("Mongoose default connection has occured "+err+" error"));
connection.on('disconnected', () => console.log('MongoDB Database disconnected established successfully!'));

// Route paths
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todo');

// Project Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

// Route Middleware
app.use('/api/user', authRoute);
app.use('/api/todos', todoRoute);

app.listen(port, () => console.log(`Express Server is running on port ${port}`));
//imports
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

// require in mongo config
// const { username, password, dbName } = require('./config.json');
const username = process.env.username;
const password = process.env.password;
const dbName = process.env.dbName;

const app = express();
const port = process.env.PORT || 8080;

const projects = require('./api/routes/projects');
const tasks = require('./api/routes/tasks');
const users = require('./api/routes/users');

app.use(cors());
app.use(express.json());

app.use('/projects',projects);
app.use('/tasks',tasks);
app.use('/users',users);

app.listen(port, ()=>{
    console.log(`Server has been started and listening on port ${port}`);
});

const mongoURL = `mongodb+srv://${username}:${password}@cluster0.a1m8dko.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoURL, () => {
    console.log('Connected to Mongo');
});
const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

const userHandler = require('./handlers/user');
const userDataHandler = require('./handlers/user-data');

const { runQuery, connection } = require('../db/index');
const queries = require('../db/queries.json');

require('dotenv').config({ path: __dirname + '/.env' });

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// User login/register data
app.get('/api/getByEmail/:email/:password', userHandler.getByEmail);

app.get('/api/getUser/:table/:id', userHandler.getUser);

app.post('/api/registerUser', userHandler.registerUser);

app.get('/api/getByToken/:token', userHandler.getByToken);

app.post('/api/changePassword', userHandler.changePassword);

app.post('/api/forgotPassword', userHandler.forgotPassword);

// Student
app.get('/api/getStudentGroup/:id', userDataHandler.getStudentGroup);

app.get('/api/getSpecialty/:id', userDataHandler.getSpecialty);

app.get('/api/getFaculty/:id', userDataHandler.getFaculty);

// Teacher
app.get(
  '/api/getTeacherCathFac/:id',
  userDataHandler.getTeacherCathedraAndFaculty
);

app.listen(port, () => {
  try {
    runQuery(connection, queries.use);
  } catch (err) {
    console.log(err);
  }
  console.log(`Server listening on the port::${port}`);
});

// Run once to create database and tables
// runQuery(connection, queires.create.db);
// runQuery(connection, queries.use);
// queries.create.tables.forEach((table) => runQuery(connection, table));

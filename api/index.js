const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

const userHandler = require('./handlers/user');
const userDataHandler = require('./handlers/user-data');
const scheduleHandler = require('./handlers/schedule');

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

app.get(
  '/api/getStudentSchedule/:studentId',
  scheduleHandler.getStudentSchedule
);

// app.get('/api/getStudentMarks/:id', userDataHandler.getStudentMarks);

// app.get('/api/getChoiceSubjects/:id', userDataHandler.getChoiseSubjects);

// app.get('/api/getChosenSubjects/:id', userDataHandler.getChosenSubjects);

// app.get('/api/getAllStudentMarks/:id', userDataHandler.getAllStudentMarks);

// app.post('/api/chooseSubject/:id', userDataHandler.chooseSubject);

// Teacher
app.get(
  '/api/getTeacherCathFac/:id',
  userDataHandler.getTeacherCathedraAndFaculty
);

app.get('/api/getGroupSchedule/:groupName', scheduleHandler.getGroupSchedule);

app.get('/api/getAllGroups', scheduleHandler.getAllGroups);

app.get('/api/getAllTeachers', scheduleHandler.getAllTeachers);

app.get(
  '/api/getTeacherSchedule/:name/:surname/:secondName',
  scheduleHandler.getTeacherSchedule
);

// app.post('/api/setSchedule/:id', userDataHandler.setSchedule);
// app.delete('/api/deleteSchedule/:id', userDataHandler.deleteSchedule);

// app.get('/api/getGroupMarks/:id', userDataHandler.getGroupMarks);

// app.post('/api/setStudentMark/:id', userDataHandler.setStudentMark);

// Admin

// app.get('/api/getUsersData/:id', userDataHandler.getUsersData);

// app.put('/api/setUsersData/:id', userDataHandler.setUsersData);

// app.post('/api/setChoiceSubject/:id', userDataHandler.setChoiceSubject);

// app.delete('/api/deleteUser/:id', userDataHandler.deleteUser);

// app.delete('/api/deleteSubject/:id', userDataHandler.deleteSubject);

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

const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

const userHandler = require('./handlers/user.js');
const userDataHandler = require('./handlers/user-data.js');
const scheduleHandler = require('./handlers/schedule.js');
const marksHandler = require('./handlers/marks.js');
const subjectsHandler = require('./handlers/subjects.js');
const userManagementHandler = require('./handlers/user-management.js');

const { runQuery, connection } = require('../db/index.js');
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

app.get('/api/getStudentMarks/:id', marksHandler.getStudentMarks);

app.get('/api/getChoiseSubjects/:id', subjectsHandler.getChoiseSubjects);

app.get('/api/getChosenSubjects/:id', subjectsHandler.getChosenSubjects);

app.post('/api/setChosenSubject', subjectsHandler.setChosenSubject);

app.post('/api/setUnchooseSubject', subjectsHandler.setUnchooseSubject);

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

app.post('/api/setSchedule', scheduleHandler.setSchedule);

app.post('/api/addSubject', scheduleHandler.addSubject);

app.delete('/api/deleteSchedule/:id', scheduleHandler.deleteSchedule);

app.get('/api/getGroupMarks/:teacherId', marksHandler.getGroupMarks);

app.post('/api/setMark', marksHandler.setMark);

// Admin

app.get('/api/getUsersData', userManagementHandler.getUsersData);

app.put('/api/setUsersData', userManagementHandler.setUsersData);

app.post('/api/setChoiseSubject', subjectsHandler.addSubject);

app.delete('/api/deleteSubject/:id', subjectsHandler.deleteSubject);

app.delete('/api/deleteUser', userManagementHandler.deleteUser);

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

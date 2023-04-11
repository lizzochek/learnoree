const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

require('dotenv').config({ path: __dirname + '/.env' });

const { runQuery, connection } = require('../db/index');
const queries = require('../db/queries.json');
const { copyFile } = require('fs');

const queryParser = (expression, valueObj) => {
  const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
  let text = expression.replace(templateMatcher, (substring, value, index) => {
    value = valueObj[value];
    return value;
  });
  return text;
};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/login', async (req, res) => {
  const queryResult = await runQuery(
    connection,
    queryParser(queries.selectUsersByEmail, { email: `'${req.body.email}'` })
  );
  res.send(queryResult);
});

app.post('/api/getUser', async (req, res) => {
  const queryResult = await runQuery(
    connection,
    queryParser(queries.selectUser, {
      table: req.body.table,
      id: `'${req.body.id}'`,
    })
  );
  res.send(queryResult);
});

app.post('/api/findByToken', async (req, res) => {
  const queryResult = await runQuery(
    connection,
    queryParser(queries.findUserByToken, {
      token: `'${req.body.token}'`,
    })
  );
  if (queryResult.length) res.send(queryResult);
  else res.sendStatus(401);
});

app.post('/api/changePassword', async (req, res) => {
  const queryResult = await runQuery(
    connection,
    queryParser(queries.modifyUserPassword, {
      password: `'${req.body.password}'`,
      token: `'${req.body.token}'`,
    })
  );
  res.sendStatus(200);
});

app.post('/api/forgotPassword', async (req, res) => {
  const userData = await runQuery(
    connection,
    queryParser(queries.selectUsersByEmail, { email: `'${req.body.email}'` })
  );

  if (!userData.length) res.sendStatus(404);

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN, {
    expiresIn: '1h',
  });

  const link = `http://localhost:8080/restore?token=${token}`;

  await runQuery(
    connection,
    queryParser(queries.modifyUserToken, {
      token: `'${token}'`,
      email: `'${req.body.email}'`,
    })
  );

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USERNAME,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.USERNAME,
    to: req.body.email,
    subject: 'Restore your Learnoree password',
    text: `Hello!

    To restore your password, click the following link: ${link}
    
    Best wishes,
    Learnoree team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.sendStatus(200);
});

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

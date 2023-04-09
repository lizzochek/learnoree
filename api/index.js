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

app.post('/api/forgotPassword', async (req, res) => {
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN, {
    expiresIn: '1h',
  });

  const link = `http://localhost:8080?token=${token}`;

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
  // Email.send({
  //   Host: process.env.SMTP_HOST,
  //   Username: process.env.SMTP_USERNAME,
  //   Password: process.env.SMTP_PASSWORD,
  //   To: 'liza.dolhova@gforces.pl',
  //   From: process.env.SMTP_SENDER,
  //   Subject: 'Restore your password',
  //   Body: `<h2>Hello! </h1>
  //   <p>To restore your password, click the following link: ${link}</p>
  //   <p>Best wishes,</p>
  //   <p>Learnoree team</p>`,
  // }).then((message) => console.log(message));
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

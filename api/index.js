const express = require('express');
const path = require('path');
const app = express(),
  bodyParser = require('body-parser'),
  port = 3080;

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

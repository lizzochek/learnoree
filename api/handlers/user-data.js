const { runQuery, connection } = require('../../db/index.js');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers.js');

module.exports = {
  getStudentGroup: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.getStudentGroup, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  getSpecialty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.getSpecialty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  getFaculty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.getFacultyBySpecialty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  getTeacherCathedraAndFaculty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.getTeacherCathedraAndFaculty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },
};

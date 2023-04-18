const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers');

module.exports = {
  findStudentGroup: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.findStudentGroup, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  findSpecialty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.findSpecialty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  findFaculty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.findFacultyBySpecialty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },

  findTeacherCathedraAndFaculty: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.findTeacherCathedraAndFaculty, {
        id: req.params.id,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(404);
  },
};

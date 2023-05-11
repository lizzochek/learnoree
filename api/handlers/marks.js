const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers');

module.exports = {
  getStudentMarks: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.getStudentMarks, {
        id: req.params.id,
      })
    );

    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(500);
  },
};

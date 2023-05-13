const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers');

module.exports = {
  getChoiseSubjects: async (req, res) => {
    const groupResult = await runQuery(
      connection,
      queryParser(queries.getGroupIdByStudent, {
        id: req.params.id,
      })
    );

    if (groupResult.length) {
      const subjectsResult = await runQuery(
        connection,
        queryParser(queries.getChoiseSubjects, {
          id: groupResult[0].Id,
        })
      );
      if (subjectsResult.length) res.send(subjectsResult);
    }
  },
  getChosenSubjects: async (req, res) => {
    const subjectsResult = await runQuery(
      connection,
      queryParser(queries.getChosenSubjects, {
        id: req.params.id,
      })
    );
    if (subjectsResult.length) res.send(subjectsResult);
  },
  setChosenSubject: async (req, res) => {
    const groupResult = await runQuery(
      connection,
      queryParser(queries.getSubjectGroup, {
        id: req.body.subjectId,
      })
    );

    if (groupResult.length) {
      await runQuery(
        connection,
        queryParser(queries.setChosenSubject, {
          groupId: groupResult[0].SubjectGroup,
          studentId: req.body.studentId,
        })
      );
      res.sendStatus(200);
    }
  },
};

const { runQuery, connection } = require('../../db/index.js');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers.js');

module.exports = {
  getChoiseSubjects: async (req, res) => {
    if (req.params.id !== 'null') {
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
        res.send(subjectsResult);
      }
    } else {
      const result = await runQuery(connection, queries.getAllChoiseSubjects);
      res.send(result);
    }
  },
  getChosenSubjects: async (req, res) => {
    const subjectsResult = await runQuery(
      connection,
      queryParser(queries.getChosenSubjects, {
        id: req.params.id,
      })
    );

    res.send(subjectsResult);
  },
  setChosenSubject: async (req, res) => {
    await connection.beginTransaction();
    try {
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
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  setUnchooseSubject: async (req, res) => {
    await connection.beginTransaction();
    try {
      const groupResult = await runQuery(
        connection,
        queryParser(queries.getChosenSubjectGroup, {
          subjectId: req.body.subjectId,
          studentId: req.body.studentId,
        })
      );

      if (groupResult.length) {
        await runQuery(
          connection,
          queryParser(queries.deleteChosenSubject, {
            groupId: groupResult[0].GroupId,
            studentId: req.body.studentId,
          })
        );
      }
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  deleteSubject: async (req, res) => {
    await connection.beginTransaction();
    try {
      await runQuery(
        connection,
        queryParser(queries.deleteSubject, {
          id: req.params.id,
        })
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  addSubject: async (req, res) => {
    await connection.beginTransaction();
    try {
      const teacherData = req.body.teacher.split(' ');
      const teacherResult = await runQuery(
        connection,
        queryParser(queries.getTeacher, {
          name: teacherData[1],
          surname: teacherData[0],
          secondName: teacherData[2],
        })
      );

      const groupRes = await runQuery(
        connection,
        queryParser(queries.getGroup, {
          group: req.body.group,
        })
      );

      const subjResult = await runQuery(
        connection,
        queryParser(queries.setSubject, {
          subjectName: req.body.subject,
          teacherId: teacherResult[0].Id,
          cathedraId: teacherResult[0].CathedraId,
        })
      );

      const persGroupResult = await runQuery(
        connection,
        queries.getLastGroupId
      );

      await runQuery(
        connection,
        queryParser(queries.setChoiseSubject, {
          group: groupRes[0].Id,
          subject: subjResult.insertId,
          semester: req.body.semester,
          subjGroup: persGroupResult[0].max + 1,
        })
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
};

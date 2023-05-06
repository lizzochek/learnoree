const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers');

module.exports = {
  getGroupSchedule: async (req, res) => {
    const groupRes = await runQuery(
      connection,
      queryParser(queries.getGroup, {
        group: req.params.groupName,
      })
    );

    if (!groupRes.length) res.send(404);

    const queryResult = await runQuery(
      connection,
      queryParser(queries.getGroupSchedule, {
        id: groupRes[0].Id,
      })
    );
    res.send(queryResult);
  },
  getStudentSchedule: async (req, res) => {
    await runQuery(connection, queries.use);
    const groupResult = await runQuery(
      connection,
      queryParser(queries.getGroupIdByStudent, {
        id: req.params.studentId,
      })
    );

    let groupSchedule;
    if (groupResult.length) {
      groupSchedule = await runQuery(
        connection,
        queryParser(queries.getGroupSchedule, {
          id: groupResult[0].Id,
        })
      );
    }

    const personalSchedule = await runQuery(
      connection,
      queryParser(queries.getStudentSchedule, {
        id: req.params.studentId,
      })
    );

    res.send([...groupSchedule, ...personalSchedule]);
  },
  getTeacherSchedule: async (req, res) => {
    const teacherIdRes = await runQuery(
      connection,
      queryParser(queries.getTeacher, {
        name: req.params.name,
        secondName: req.params.secondName,
        surname: req.params.surname,
      })
    );

    if (!teacherIdRes.length) res.send(404);

    const teacherSchedule = await runQuery(
      connection,
      queryParser(queries.getTeacherSchedule, {
        id: teacherIdRes[0].Id,
      })
    );

    res.send(teacherSchedule);
  },
  getAllTeachers: async (req, res) => {
    const teacherResult = await runQuery(connection, queries.getAllTeachers);
    res.send(teacherResult);
  },
  getAllGroups: async (req, res) => {
    const groupResult = await runQuery(connection, queries.getAllGroups);
    res.send(groupResult);
  },
};

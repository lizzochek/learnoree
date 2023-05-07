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
  setSchedule: async (req, res) => {
    await connection.beginTransaction();
    try {
      let groupRes;
      if (req.params.groupName) {
        groupRes = await runQuery(
          connection,
          queryParser(queries.getGroup, {
            group: req.params.groupName,
          })
        );
        if (!groupRes.length) throw new Error('Group not found');
      }

      const subjectRes = await runQuery(
        connection,
        queryParser(queries.getSubject, {
          subject: req.params.subjectName,
        })
      );
      if (!subjectRes.length) throw new Error('Group not found');

      let persSubjRes;
      if (!groupRes) {
        persSubjRes = await runQuery(
          connection,
          queryParser(queries.getPersonalSubjectGroup, {
            subject: subjectRes[0].Id,
          })
        );
        if (!persSubjRes.length) throw new Error('Group not found');
      }

      const queryResult = await runQuery(
        connection,
        queryParser(queries.setSchedule, {
          groupId: groupRes[0]?.Id ? groupRes[0]?.Id : null,
          subjectId: subjectRes[0].Id,
          personalSubjId: persSubjRes[0].Id ? persSubjRes[0].Id : null,
          time: req.params.time,
          place: req.params.place,
          semester: req.params.semester,
          weekDay: req.params.weekDay,
          week: req.params.week,
        })
      );

      if (!queryResult.length) throw new Error('Something went wrong!');
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  deleteSchedule: async (req, res) => {},
};

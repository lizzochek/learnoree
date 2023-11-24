const { runQuery, connection } = require('../../db/index.js');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers.js');

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
      if (req.body.groupName) {
        groupRes = await runQuery(
          connection,
          queryParser(queries.getGroup, {
            group: req.body.groupName,
          })
        );
        if (!groupRes.length) throw new Error('Group not found');
      }

      const subjectRes = await runQuery(
        connection,
        queryParser(queries.getSubject, {
          subject: req.body.subjectName,
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

      let persSubj = null;
      let group = null;

      if (persSubjRes) persSubj = persSubjRes[0].Id;
      if (groupRes) group = groupRes[0].Id;

      const queryResult = await runQuery(
        connection,
        queryParser(queries.setSchedule, {
          groupId: group,
          subjectId: subjectRes[0].Id,
          personalSubjId: persSubj,
          time: req.body.time,
          place: req.body.place,
          semester: req.body.semester,
          weekDay: req.body.weekDay,
          week: req.body.week,
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
      const teacherRes = await runQuery(
        connection,
        queryParser(queries.getTeacher, {
          name: req.body.teacherName,
          surname: req.body.teacherSurname,
          secondName: req.body.teacherSecondName,
        })
      );
      if (!teacherRes.length) throw new Error('Teacher not found');

      const cathedraRes = await runQuery(
        connection,
        queryParser(queries.getCatherdaByName, {
          name: req.body.cathedraName,
        })
      );
      if (!cathedraRes.length) throw new Error('Cathedra not found');

      const queryResult = await runQuery(
        connection,
        queryParser(queries.setSubject, {
          subjectName: req.body.subjectName,
          cathedraId: cathedraRes[0].Id,
          teacherId: teacherRes[0].Id,
        })
      );

      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  deleteSchedule: async (req, res) => {
    await connection.beginTransaction();
    try {
      const queryResult = await runQuery(
        connection,
        queryParser(queries.deleteLesson, {
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
};

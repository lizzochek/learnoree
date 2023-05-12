const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const { queryParser, lowerCaseData } = require('../helpers');

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
  getGroupMarks: async (req, res) => {
    const subjectResult = await runQuery(
      connection,
      queryParser(queries.getTeacherSubjects, {
        id: req.params.teacherId,
      })
    );

    if (subjectResult) {
      const result = [];

      for (const element of subjectResult) {
        result.push({ ...lowerCaseData(element), groups: [] });

        // Getting personal subject students
        let groupsResult = await runQuery(
          connection,
          queryParser(queries.getPersonalSubjectGroups, {
            id: element.SubjectId,
          })
        );

        for (const group of groupsResult) {
          let index = result.findIndex(
            (res) => res.subjectId == group.SubjectId
          );
          result[index]['groups'].push({ id: group.GroupId, students: [] });

          let studentsResult = await runQuery(
            connection,
            queryParser(queries.getPersonalSubjStudents, {
              id: group.GroupId,
            })
          );

          for (const student of studentsResult) {
            let groupIndex = result[index]['groups'].findIndex(
              (arr) => arr.id == student.GroupId
            );
            result[index]['groups'][groupIndex]['students'].push({
              studentId: student.StudentId,
              name: student.Name,
              surname: student.Surname,
              secondName: student.SecondName,
              marks: [],
            });

            let marksResult = await runQuery(
              connection,
              queryParser(queries.getStudentMarksbyId, {
                studentId: student.StudentId,
                subjectId: group.SubjectId,
              })
            );

            for (const mark of marksResult) {
              result[index]['groups'][groupIndex]['students']['marks'].push({
                mark: mark.Mark,
                taskType: mark.TaskType,
              });
            }
          }
        }

        //Getting general subjects students
        groupsResult = await runQuery(
          connection,
          queryParser(queries.getGeneralSubjectGroups, {
            id: element.SubjectId,
          })
        );

        for (const group of groupsResult) {
          let index = result.findIndex(
            (res) => res.subjectId == group.SubjectId
          );
          result[index]['groups'].push({
            id: group.GroupId,
            name: group.GroupName,
            students: [],
          });

          let studentsResult = await runQuery(
            connection,
            queryParser(queries.getGeneralSubjStudents, {
              id: group.GroupId,
            })
          );

          for (const student of studentsResult) {
            let groupIndex = result[index]['groups'].findIndex(
              (arr) => arr.id == student.GroupId
            );
            result[index]['groups'][groupIndex]['students'].push({
              studentId: student.StudentId,
              name: student.Name,
              surname: student.Surname,
              secondName: student.SecondName,
              marks: [],
            });

            let marksResult = await runQuery(
              connection,
              queryParser(queries.getStudentMarksbyId, {
                studentId: student.StudentId,
                subjectId: group.SubjectId,
              })
            );

            for (const mark of marksResult) {
              const studentIndex = result[index]['groups'][groupIndex][
                'students'
              ].findIndex((arr) => arr.studentId == student.StudentId);

              result[index]['groups'][groupIndex]['students'][studentIndex][
                'marks'
              ].push({
                markId: mark.MarkId,
                mark: mark.Mark,
                taskType: mark.TaskType,
              });
            }
          }
        }
      }
      res.send(result);
    }
  },
  setMark: async (req, res) => {
    try {
      const queryResult = await runQuery(
        connection,
        queryParser(queries.setMark, {
          studentId: req.body.studentId,
          mark: req.body.mark,
          taskType: req.body.taskType,
          subjectId: req.body.subjectId,
        })
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  },
};

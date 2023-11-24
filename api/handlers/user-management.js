const { runQuery, connection } = require('../../db/index.js');
const queries = require('../../db/queries.json');

const { queryParser } = require('../helpers.js');

module.exports = {
  getUsersData: async (req, res) => {
    const result = { students: [], admins: [], teachers: [] };
    const users = await runQuery(connection, queries.getAllUsers);
    for (const user of users) {
      switch (user.Role) {
        case 'admin':
          const adminData = await runQuery(
            connection,
            queryParser(queries.selectUser, {
              id: user.Id,
              table: 'Admins',
            })
          );

          result.admins.push({
            ...user,
            name: adminData[0].Name,
            surname: adminData[0].Surname,
            secondName: adminData[0].SecondName,
            phone: adminData[0].Phone,
          });
          break;
        case 'student':
          const studentData = await runQuery(
            connection,
            queryParser(queries.selectUser, {
              id: user.Id,
              table: 'Students',
            })
          );

          const group = await runQuery(
            connection,
            queryParser(queries.getStudentGroup, {
              id: user.Id,
            })
          );

          const cathedra = await runQuery(
            connection,
            queryParser(queries.getGroupCathedra, {
              id: group[0].GroupId,
            })
          );

          result.students.push({
            ...user,
            name: studentData[0].Name,
            surname: studentData[0].Surname,
            secondName: studentData[0].SecondName,
            phone: studentData[0].Phone,
            groupName: group[0].Name,
            cathedraName: cathedra[0].Name,
          });

          break;
        case 'teacher':
          const teacherData = await runQuery(
            connection,
            queryParser(queries.selectUser, {
              id: user.Id,
              table: 'Teachers',
            })
          );

          const cathedraData = await runQuery(
            connection,
            queryParser(queries.getCathedraById, {
              id: teacherData[0].CathedraId,
            })
          );

          result.teachers.push({
            ...user,
            name: teacherData[0].Name,
            surname: teacherData[0].Surname,
            secondName: teacherData[0].SecondName,
            phone: teacherData[0].Phone,
            cathedraName: cathedraData[0].Name,
          });
          break;
      }
    }
    res.send(result);
  },
  setUsersData: async (req, res) => {
    await connection.beginTransaction();
    try {
      await runQuery(
        connection,
        queryParser(queries.setUserAuthorization, {
          id: req.body.id,
          authorized: req.body.authorizationValue,
        })
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },
  deleteUser: async (req, res) => {
    await connection.beginTransaction();
    try {
      const table =
        req.body.type.charAt(0).toUpperCase() + req.body.type.slice(1) + 's';

      await runQuery(
        connection,
        queryParser(queries.setForeignKeyCheck, {
          num: 0,
        })
      );

      await runQuery(
        connection,
        queryParser(queries.deleteUserFromTable, {
          id: req.body.id,
          table,
        })
      );

      await runQuery(
        connection,
        queryParser(queries.deleteUser, {
          id: req.body.id,
        })
      );

      await runQuery(
        connection,
        queryParser(queries.setForeignKeyCheck, {
          num: 1,
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

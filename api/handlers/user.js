const { runQuery, connection } = require('../../db/index');
const queries = require('../../db/queries.json');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { queryParser } = require('../helpers');
module.exports = {
  findByEmail: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.selectUsersByEmail, {
        email: `'${req.params.email}'`,
      })
    );
    if (queryResult.length) {
      if (queryResult[0].password == req.body.password) res.send(queryResult);
    } else res.sendStatus(404);
  },

  getUser: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.selectUser, {
        table: req.params.table,
        id: `'${req.params.id}'`,
      })
    );
    res.send(queryResult);
  },

  registerUser: async (req, res) => {
    await connection.beginTransaction();
    try {
      const userInsertResult = await runQuery(
        connection,
        queryParser(queries.addUserCredentials, {
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        })
      );

      if (!userInsertResult?.insertId) throw new Error();
      const generalFields = {
        name: req.body.name,
        surname: req.body.surname,
        secondName: req.body.secondName,
        phone: req.body.phone,
      };

      let queryRes;
      switch (req.body.role) {
        case 'admin':
          queryRes = await runQuery(
            connection,
            queryParser(queries.insertAdmin, {
              ...generalFields,
              id: userInsertResult.insertId,
            })
          );
          break;
        case 'teacher':
          const cathedraSearchRes = (queryRes = await runQuery(
            connection,
            queryParser(queries.findCathedra, {
              faculty: req.body.faculty,
              cathedra: req.body.cathedra,
            })
          ));

          queryRes = await runQuery(
            connection,
            queryParser(queries.insertTeacher, {
              ...generalFields,
              id: userInsertResult.insertId,
              cathedraId: cathedraSearchRes[0]?.length
                ? cathedraSearchRes[0].Id
                : null,
            })
          );
          break;
        case 'student':
          const groupSearchRes = (queryRes = await runQuery(
            connection,
            queryParser(queries.findGroup, {
              group: req.body.group,
            })
          ));

          queryRes = await runQuery(
            connection,
            queryParser(queries.insertStudent, {
              ...generalFields,
              id: userInsertResult.insertId,
              startDate: req.body.startDate,
              endDate: req.body.endDate,
            })
          );

          if (queryRes?.insertId && groupSearchRes[0]?.Id) {
            await runQuery(
              connection,
              queryParser(queries.insertStudentGroupLink, {
                student: queryRes.insertId,
                group: groupSearchRes[0].Id,
              })
            );
          }
          break;
        default:
          throw new Error();
      }

      if (!queryRes?.insertId) throw new Error();
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      connection.rollback();
      res.sendStatus(500);
    }
  },

  findByToken: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.findUserByToken, {
        token: `'${req.params.token}'`,
      })
    );
    if (queryResult.length) res.send(queryResult);
    else res.sendStatus(401);
  },

  changePassword: async (req, res) => {
    const queryResult = await runQuery(
      connection,
      queryParser(queries.modifyUserPassword, {
        password: `'${req.body.password}'`,
        token: `'${req.body.token}'`,
      })
    );
    res.sendStatus(200);
  },

  forgotPassword: async (req, res) => {
    await connection.beginTransaction();

    try {
      const userData = await runQuery(
        connection,
        queryParser(queries.selectUsersByEmail, {
          email: `'${req.body.email}'`,
        })
      );

      if (!userData.length) res.sendStatus(404);

      const token = jwt.sign({ email: req.body.email }, process.env.JWT_TOKEN, {
        expiresIn: '1h',
      });

      const link = `http://localhost:8080/restore?token=${token}`;

      await runQuery(
        connection,
        queryParser(queries.modifyUserToken, {
          token: `'${token}'`,
          email: `'${req.body.email}'`,
        })
      );

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USERNAME,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.USERNAME,
        to: req.body.email,
        subject: 'Restore your Learnoree password',
        text: `Hello!
      
          To restore your password, click the following link: ${link}
          
          Best wishes,
          Learnoree team`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          throw new Error();
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.sendStatus(200);
    } catch (err) {
      connection.rollback();
      res.sendStatus(401);
    }
  },
};

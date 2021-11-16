function user(database, type) {
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const secret = require("../config");
  const User = database.define(
    "user",
    {
      number: {
        type: type.INTEGER,
        unique: true,
      },
      email: {
        type: type.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: type.STRING,
        unique: true,
      },
      password: {
        type: type.STRING,
      },
      college: type.STRING,
      stream: type.STRING,
    },
    { timestamps: false }
  );

  User.registration = async (req) => {
    try {
      let result;
      if (req.body.number == null) {
        if (req.body.password == null || req.body.email == null) {
          result = {
            error: 1,
            message: "enter username and password",
          };
        } else {
          const salt = await bcrypt.genSalt(10);
          let password = req.body.password;
          let con_password = req.body.con_password;
          if (password == con_password) {
            let secretPassword = await bcrypt.hash(password, salt);
            let user = {
              username: req.body.username,
              email: req.body.email,
              password: secretPassword,
              college: req.body.college,
              stream: req.body.stream,
            };
            let createdUser = await User.create(user);
            const token = await jwt.sign(
              { user_id: createdUser.id, email: createdUser.email },
              secret.jwtSecret,
              { expiresIn: "2hr" }
            );
            result = {
              error: 0,
              data: {
                createdUser,
                token,
              },
              message: "created",
            };
          } else {
            result = {
              error: 1,
              message: "password don't match",
            };
          }
        }
      } else if (req.body.email == null) {
        let user = {
          username: req.body.username,
          number: req.body.number,
          college: req.body.college,
          stream: req.body.stream,
        };
        let createdUser = await User.create(user);
        const token = await jwt.sign(
          { user_id: createdUser.id, username: createdUser.username },
          secret.jwtSecret,
          { expiresIn: "2hr" }
        );
        result = {
          error: 0,
          data: {
            createdUser,
            token,
          },
          message: "created",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };


  User.login = async (req, models) => {
    try {
      let result;
      if (req.body.number == null && req.body.email == null) {
        result = {
          error: 1,
          message: "enter number or email",
        };
      } else if (req.body.number == null) {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user !== null) {
          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          if (validPassword) {
            await models.Token.destroy({ where: { userId: user.id } });
            const token = await jwt.sign(
              { user_id: user.id, username: user.username },
              secret.jwtSecret,
              { expiresIn: "2hr" }
            );
            let createdToken = await models.Token.create({
              userId: user.id,
              token: token,
            });
            result = {
              error: 0,
              message: "login successful",
              data: createdToken,
            };
          } else {
            result = {
              error: 1,
              message: "password don't match",
            };
          }
        } else {
          result = {
            error: 1,
            message: "user not found",
          };
        }
      } else if (req.body.email == null) {
        const user = await User.findOne({ where: { number: req.body.number } });
        if (user !== null) {
          await models.Token.destroy({ where: { userId: user.id } });
          const token = await jwt.sign(
            { user_id: user.id, username: user.username },
            secret.jwtSecret,
            { expiresIn: "2hr" }
          );
          let createdToken = await models.Token.create({
            userId: user.id,
            token: token,
          });
          result = {
            error: 0,
            message: "login successful",
            data: createdToken,
          };
        } else {
          result = {
            error: 1,
            message: "user not found",
          };
        }
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return User;
}

module.exports = user;

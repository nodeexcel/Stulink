function user(database, type) {
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const secret = require("../config");
  const User = database.define(
    "user",
    {
      email: {
        type: type.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: type.STRING,
        unique: true,
        // allowNull: false,
      },
      password: {
        type: type.STRING,
        allowNull: false,
      },
      college: type.STRING,
      stream: type.STRING,
    },
    { timestamps: false },
    {
      hooks: {
        beforeCreate: (user, options) => {
          return new Promise((resolve, reject) => {
            User.findOne({ where: { username: user.username } }).then(
              (found) => {
                if (found) {
                  reject(new Error("username already exist"));
                } else {
                  resolve();
                }
              }
            );
          });
        },
      },
    }
  );
  // User.registerationByNumber = async (req, models) => {
  //   try {
  //     console.log("this is for registration by nu3mber");
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };
  User.registration = async (req, models) => {
    try {
      let result;
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
        return result;
      } else {
        result = {
          error: 1,
          message: "password don't match",
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return User;
}

module.exports = user;

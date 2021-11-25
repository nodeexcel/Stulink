const { QueryTypes } = require("sequelize");
function user(database, type) {
  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcrypt");
  const secret = require("../../config");
  const User = database.define(
    "user",
    {
      number: {
        type: type.STRING,
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

  User.registration = async (req, models) => {
    try {
      let result;
      const salt = await bcrypt.genSalt(10);
      let password = req.body.password;
      let con_password = req.body.con_password;
      if (password != con_password){
        result = {
          error: 1,
          message: "password and confirm password should be same",
        };
        return result
      }
      let secretPassword = await bcrypt.hash(password, salt);
      if (req.body.number == null) {
        if (req.body.password == null || req.body.email == null) {
          result = {
            error: 1,
            message: "enter email and password",
          };
          return result
        } 
        var check_user = await User.findOne({ where: { email: req.body.email } });
        var user = {
          username: req.body.username,
          email: req.body.email,
          password: secretPassword,
          college: req.body.college,
          stream: req.body.stream,
        };
        }else {
        var check_user = await User.findOne({ where: { number: req.body.number } });  
        var user = {
          username: req.body.username,
          number: req.body.number,
          password: secretPassword,
          college: req.body.college,
          stream: req.body.stream,
        };
      }


        if (check_user != null){
        if (check_user.email == req.body.email){
          result = {
            error: 1,
            message: "user with this email already exists",
          };
          return result
        }
        if (check_user.username == req.body.username){
          result = {
            error: 1,
            message: "user with this username already exists",
          };
          return result
        }}


        let createdUser = await User.create(user);
        let profile = await models.UserProfile.create({
          image: null,
          email: req.body.email,
          state: req.body.state,
          username: req.body.username,
          university: req.body.university,
          date_of_birth: req.body.dob,
          bio: req.body.bio,
          userId: createdUser.id,
        });
        let privacy = await models.UserPrivacy.create({
          userId: profile.id,
        });
        let settings = await models.UserSettings.create({
          userId: profile.id,
        });
        const token = await jwt.sign(
          { user_id: createdUser.id, email: createdUser.email },
          secret.jwtSecret,
          { expiresIn: "2hr" }
        );
        try {
          let friend = await models.UserProfile.findOne({
            where: { username: req.body.friendsName },
          });
          let friendRelation = await models.FriendRequest.create({
            senderId: profile.id,
            receiver: friend.id,
          });
          result = {
            error: 0,
            data: {
              createdUser,
              profile,
              friendRelation,
              privacy,
              settings,
              token,
            },
            message: "created",
          };
          return result
        } catch (error) {
          result = {
            error: 0,
            data: {
              createdUser,
              profile,
              privacy,
              settings,
              token,
            },
            message: "created, no friends found",
          };
          return result
        }
      } catch (error) {
        result = {
          error: error,
          message: "something went wrong",
        };
        return result
      }}
      
      
  User.login = async (req, models) => {
    try {
      let result;
      if (req.body.number == null && req.body.email == null) {
        result = {
          error: 1,
          message: "enter number or email",
        };
        return result
      } 
      if (req.body.number == null) {
        var user = await User.findOne({ where: { email: req.body.email } });
      }else {
        var user = await User.findOne({ where: { number: req.body.number } });
      }
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
            return result
          } else {
            result = {
              error: 1,
              message: "password don't match",
            };
            return result
          }
        } else {
          result = {
            error: 1,
            message: "user not found",
          };
          return result
        }
      } 
      catch (error) {
      throw new Error(error);
    }
  };

  User.updatedPassword = async (req) => {
    try {
      let result;
      let user = req.user;
      let oldPassword = req.body.oldpassword;
      let validPassword = await bcrypt.compare(oldPassword, user.password);
      if (validPassword) {
        let newPassword = req.body.newPassword;
        if (newPassword == oldPassword) {
          result = {
            error: 1,
            message: "you are using old password. please try new password",
          };
        } else {
          let newConfPassword = req.body.newConfPassword;
          if (newPassword == newConfPassword) {
            const salt = await bcrypt.genSalt(10);
            let secretPassword = await bcrypt.hash(newPassword, salt);
            let updatedPassword = await User.update(
              {
                password: secretPassword,
              },
              { where: { id: user.id } }
            );
            result = {
              error: 0,
              message: "password updated",
            };
          } else {
            result = {
              error: 1,
              message: "password dont match",
            };
          }
        }
      } else {
        result = {
          error: 1,
          message: "wrong old password",
        };
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  return User;
}

module.exports = user;

const jwt = require("jsonwebtoken");
const { response } = require("../utils");
const secret = require("../config");
const db = require("../db");

const authForAllUser = async (req, res, next) => {
  let headerToken = req.headers.access_token.split(" ");
  if (headerToken) {
    try {
      let checkJwt = await jwt.verify(headerToken[1], secret.jwtSecret);
      let userProfile = await db.UserProfile.findOne({
        where: { userId: checkJwt.user_id },
      });
      let user = await db.User.findOne({ where: { id: checkJwt.user_id } });
      if (userProfile.isDeactive == true) {
        res.status(401).send("your account is deactivated");
      } else {
        req.user = user;
        req.userProfile = userProfile;
        next();
      }
    } catch (error) {
      res.status(401).send("Auth token invalid");
    }
  } else {
    return res.status(401).send(response(1, "Token not provided"));
  }
};

module.exports = { authForAllUser };

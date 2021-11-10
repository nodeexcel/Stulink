const db = require("../db");
const { response } = require("../utils");
let registration = async (req, res) => {
  try {
    // let result;
    // let number = req.body.number;
    // if ((number !== null) || (typeof number !== "undefinded")) {
    //   result = await db.User.registerationByNumber(req, db);
    // } else {
    let result = await db.User.registration(req, db);
    // }
    // console.log(result);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { registration };

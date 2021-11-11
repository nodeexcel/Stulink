const db = require("../db");
const { response } = require("../utils");
let homePageStates = async (req, res) => {
  try {
    let result = await db.States.addStates(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

let getStatesData = async (req, res) => {
  try {
    let result = await db.States.getStates(db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { homePageStates, getStatesData };

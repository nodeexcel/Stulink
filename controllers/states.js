const db = require("../db");
const { response } = require("../utils");
let addStatesData = async (req, res) => {
  try {
    let result = await db.States.addStates(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { addStatesData };

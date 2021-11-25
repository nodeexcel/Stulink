const db = require("../db");
const { response } = require("../utils");
let searchedCollegeData = async (req, res) => {
  try {
    let result = await db.College.findCollegeData(req);
    console.log(result);
    res.status(200).send(response.searchPageMessage(result.error, result.message, result.data, result.states, result.city));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { searchedCollegeData };
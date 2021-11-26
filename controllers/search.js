const db = require("../db");
const { Op } = require("sequelize");
const { response } = require("../utils");
let searchedCollegeData = async (req, res) => {
  try {
    let result = await db.College.findCollegeData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

let allStatesAndCities = async (req, res) => {
  try {
    let result = await db.States.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: db.City,
        },
      ],
    });
    res.status(200).send(response(result.error, result.message, result));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { searchedCollegeData, allStatesAndCities };

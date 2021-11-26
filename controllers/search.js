const db = require("../db");
const { Op } = require("sequelize");
const { response } = require("../utils");
let searchedCollegeData = async (req, res) => {
  try {
    let result = await db.College.findCollegeData(req, db);
    let statesResult = await allStatesAndCities(req, res);
    res.json({ result, statesResult });
  } catch (error) {
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
          where: { id: { [Op.col]: "state.cityId" } },
        },
      ],
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { searchedCollegeData };

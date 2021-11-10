const db = require("../db");
const { response } = require("../utils");
let homePage = async (req, res) => {
  try {
    let result = await db.College.trending(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

let getImage = async(req,res) => {
  try {
    let result = await db.College.getImage(req);
    res.contentType("image/jpeg");
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

module.exports = { homePage,getImage };

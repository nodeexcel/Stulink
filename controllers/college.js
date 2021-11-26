const db = require("../db");
const { response } = require("../utils");
let addCollegeData = async (req, res) => {
  try {
    let result = await db.College.addCollege(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addCollegeGallery = async(req,res) => {
  try {
    let result = await db.College.addImages(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

let getCollegeImages = async(req, res) => {
  try {
    let result = await db.College.getImages(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

let getCollegesDataById = async(req,res) => {
  try {
    let result = await db.College.getCollegeData(req, db);
    // console.log(result);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

module.exports = { addCollegeData,addCollegeGallery,getCollegeImages,getCollegesDataById };

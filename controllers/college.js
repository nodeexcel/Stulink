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

let addCollegeGallery = async (req, res) => {
  try {
    let result = await db.College.addImages(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getCollegeImages = async (req, res) => {
  try {
    let result = await db.College.getImages(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getCollegesDataById = async (req, res) => {
  try {
    let result = await db.College.getCollegeData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getCollegeNews = async (req, res) => {
  try {
    let result = await db.College.getCollegeNewsData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};
let addAdmissionInfo = async (req, res) => {
  try {
    let result = await db.AdmissionInfo.addAdmissionInfoData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};
let getAdmissionInfo = async (req, res) => {
  try {
    let result = await db.AdmissionInfo.getAdmissionInfoData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = {
  getAdmissionInfo,
  addCollegeData,
  addCollegeGallery,
  getCollegeImages,
  getCollegesDataById,
  getCollegeNews,
  addAdmissionInfo,
};

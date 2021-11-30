const db = require("../db");
const { response } = require("../utils");

let addExams = async (req, res) => {
  try {
    let result = await db.Exam.addExamData(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addExamOverview = async (req, res) => {
  try {
    let result = await db.ExamOverview.addExamOverviewData(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getExamOverview = async (req, res) => {
  try {
    let result = await db.ExamOverview.getExamOverviewData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addApplicationInformation = async (req, res) => {
  try {
    let result = await db.ApplicationGuidelines.addApplication(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getApplicationInfo = async (req, res) => {
  try {
    let result = await db.ApplicationGuidelines.getApplicationInfoData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};
let addRegistrationInfo = async (req, res) => {
  try {
    let result = await db.RegistrationInfo.addRegistrationInfoData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getRegistrationInfo = async (req, res) => {
  try {
    let result = await db.RegistrationInfo.getRegistrationInfoData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addSyllabus = async (req, res) => {
  try {
    let result = await db.Syllabus.addSyllabusData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getSyllabus = async (req, res) => {
  try {
    let result = await db.Syllabus.getSyllabusData(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = {
  getSyllabus,
  addSyllabus,
  addExams,
  addExamOverview,
  getExamOverview,
  addApplicationInformation,
  getApplicationInfo,
  addRegistrationInfo,
  getRegistrationInfo,
};

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
    let result = await db.ExamOverview.getExamOverviewData(req,db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let addApplicationInformation = async (req, res) => {
  try {
    let result = await db.ApplicationGuidelines.addApplication(req,db);
    // console.log(result);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getApplicationInfo = async (req, res) => {
  try {
    let result = await db.ApplicationGuidelines.getApplicationInfoData(req,db);
    // console.log(result);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { addExams, addExamOverview ,getExamOverview,addApplicationInformation, getApplicationInfo};

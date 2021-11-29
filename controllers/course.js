const db = require("../db");
const { response } = require("../utils");
let addCourseDetails = async (req, res) => {
  try {
    let result = await db.Course.addCourse(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
};

let getCourseByType = async(req,res) => {
  try {
    let result = await db.Course.getCourseType(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

let getCourseRelatedColleges =async(req,res) => {
  try {
    let result = await db.Course.getCourseColleges(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

let getCourseExams = async(req,res) => {
  try {
    let result = await db.Exam.getAllExamsForCourse(req, db);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    res.status(500).send(response(1, error.message));
  }
}

module.exports = { addCourseDetails,getCourseByType,getCourseRelatedColleges,getCourseExams };

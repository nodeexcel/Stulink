const db = require("../db");
const { response } = require("../utils");
let addCourseDetails = async (req, res) => {
  try {
    let result = await db.Course.addCourse(req);
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

let getCourseDetails = async (req, res) => {
  try {
    let result;
    if (req.route.path == "/getDiplomaCourse") {
      result = await db.Course.getDiplomaCourse(req);
    } else if (req.route.path == "/getUndergraduateCourse") {
      result = await db.Course.getUndergraduateCourse(req);
    } else if (req.route.path == "/getPostGraduateCourse") {
      result = await db.Course.getPostGraduateCourse(req);
    } else if (req.route.path == "/getPhdCourse") {
      result = await db.Course.getPhdCourse(req);
    } else if (req.route.path == "/getAllCourse") {
      result = await db.Course.getAllCourse(req);
    } else {
      res.status(404).send(response(1, "not found"));
    }
    res.status(200).send(response(result.error, result.message, result.data));
  } catch (error) {
    console.log(error);
    res.status(500).send(response(1, error.message));
  }
};

module.exports = { addCourseDetails, getCourseDetails };

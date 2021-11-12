const db = require("../db");

let allData = async (req, res) => {
  let courseDetailsData = await getCourseDetails(req, res);
  let collegeCountData = await getCount(req, res);
  let statesData = await getStatesData(req, res);
  let newsData = await getNewsData();
  res.json({ courseDetailsData, collegeCountData, statesData, newsData });
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
    } else if (req.route.path == "/") {
      result = await db.Course.getAllCourse(req);
    } else {
      result = "not found";
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

let getCount = async (req, res) => {
  try {
    let result = await db.Course.courseDataCount(db);
    return result;
  } catch (error) {
    console.log(error);
  }
};

let getStatesData = async (req, res) => {
  try {
    let result = await db.States.getStates(db);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

let getNewsData = async (req, res) => {
  try {
    let result = await db.News.getNews();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { allData };

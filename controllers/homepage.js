const db = require("../db");

let allData = async (req, res) => {
  let courseDetailsData = await getCourseDetails(req, res);
  let collegeCountData = await getCount(req, res);
  let trendingCollege = await getCollegeDetails(req, res);
  let statesData = await getStatesData(req, res);
  let newsData = await getNewsData();
  res.json({
    courseDetailsData,
    trendingCollege,
    collegeCountData,
    statesData,
    newsData,
  });
};

let getCollegeDetails = async (req, res) => {
  try {
    let result = await db.College.findCollegeDataForHomePage(db);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

let courseDetailsForOtherPage = async (req, res) => {
  let data = await getCourseDetails(req, res);
  res.json(data);
};

let getCourseDetails = async (req, res) => {
  try {
    let result = await db.Course.getAllCourse(req);
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
    throw new Error(error);
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

module.exports = { allData, courseDetailsForOtherPage, getCourseDetails };
